import { createBrowserHistory } from "history";
import * as React from "react";
import { Reducer, useContext, useEffect, useReducer, useRef } from "react";
import { fetchCandidates } from "../../services/fetchCandidates";
import {
  Action,
  Candidate,
  candidatesReducer,
  DEFAULT_LIMIT,
  defaultStore,
  populateFromQS,
  Store,
} from "../../store/candidates/candidatesReducer";
import { CityValue } from "../../store/candidates/cities";
import { TechStackValue } from "../../store/candidates/techStack";

interface Props {
  children: React.ReactNode;
}

interface QueryParams {
  skip?: number;
  limit?: number;
  cities?: CityValue[];
  techStack?: TechStackValue[];
}

const serializeQS = ({ skip, limit, cities, techStack }: QueryParams) => {
  const url = new URL(window.location.href);
  if (skip) {
    url.searchParams.set("skip", skip.toString());
  } else {
    url.searchParams.delete("skip");
  }
  if (limit && limit !== DEFAULT_LIMIT) {
    url.searchParams.set("limit", limit.toString());
  } else {
    url.searchParams.delete("limit");
  }
  if (cities && cities.length) {
    url.searchParams.set("cities", cities.join(","));
  } else {
    url.searchParams.delete("cities");
  }
  if (techStack && techStack.length) {
    url.searchParams.set("techStack", techStack.join(","));
  } else {
    url.searchParams.delete("techStack");
  }
  return url.search;
};

const useCandidatesProvider = (): ICandidatesContext => {
  const historyRef = useRef(createBrowserHistory());
  const history = historyRef.current;

  const [
    { candidates, filters, skip, limit, totalCount },
    dispatch,
  ] = useReducer<Reducer<Store, Action>>(
    candidatesReducer,
    populateFromQS(defaultStore, new URL(window.location.href).search)
  );
  const { cities, techStack } = filters;
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "POP") {
        dispatch({ type: "populateFromQS", payload: location.search });
      }
    });
    return () => unlisten();
  });
  useEffect(() => {
    history.push(serializeQS({ skip, limit, cities, techStack }));
  }, [skip, limit, cities, techStack]);
  useEffect(() => {
    let canceled = false;
    fetchCandidates({ skip, filters: { cities, techStack } }).then(
      (response) => {
        if (canceled) {
          return;
        }
        console.log(response);
        dispatch({
          type: "setCandidates",
          payload: {
            candidates: response.items,
            totalCount: response.totalCount,
          },
        });
      }
    );
    return () => {
      canceled = true;
    };
  }, [skip, cities, techStack]);
  return {
    candidates,
    skip,
    totalCount,
    limit,
    cities: filters.cities,
    techStack: filters.techStack,
    setCities: (cities) => {
      dispatch({ type: "filterCities", payload: cities });
    },
    setTechStack: (techStack) => {
      dispatch({ type: "filterTechStack", payload: techStack });
    },

    nextPage: () => {
      dispatch({ type: "nextPage" });
    },
    prevPage: () => {
      dispatch({ type: "prevPage" });
    },
  };
};

interface ICandidatesContext {
  candidates: Candidate[];
  skip: number;
  totalCount: number;
  limit: number;
  cities: CityValue[];
  techStack: TechStackValue[];
  setCities: (cities: CityValue[]) => void;
  setTechStack: (techStack: TechStackValue[]) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const CandidatesContext = React.createContext<ICandidatesContext>({
  candidates: [],
  skip: 0,
  limit: DEFAULT_LIMIT,
  totalCount: 0,
  cities: [],
  techStack: [],
  setCities() {},
  setTechStack() {},
  nextPage() {},
  prevPage() {},
});

export const useCandidates = () => useContext(CandidatesContext);

export const CandidatesProvider: React.FunctionComponent<Props> = ({
  children,
}) => {
  const value = useCandidatesProvider();

  return (
    <CandidatesContext.Provider value={value}>
      {value.candidates.length ? children : <div>Loading...</div>}
    </CandidatesContext.Provider>
  );
};
