import { Reducer } from "react";
import { CityValue } from "./cities";
import { TechStackValue } from "./techStack";

export interface CandidateRaw {
  years?: number;
  name: string | null;
  _id: string;
  _owner: string;
  _createdDate: {
    $date: string;
  };
  _updatedDate: {
    $date: string;
  };
  english?: string;
  contacts?: string | null;
  cv?: string | null;
  salary?: string;
  currentPosition?: string;
  canShow: boolean;
  desiredPosition?: string;
  techStack?: TechStackValue[] | string;
  summary?: string;
  linkedIn?: string | null;
  cities?: CityValue[] | string;
  index: number;
}

export interface Candidate {
  id: string;
  name: string | null;
  years?: number;
  english?: string;
  contacts?: string | null;
  cv?: string | null;
  salary?: string;
  currentPosition?: string;
  desiredPosition?: string;
  techStack: TechStackValue[];
  summary?: string;
  linkedIn?: string | null;
  cities: CityValue[];
}

export interface Filters {
  cities: CityValue[];
  techStack: TechStackValue[];
}

export interface Store {
  candidates: Candidate[];
  filters: Filters;
  totalCount: number;
  skip: number;
  limit: number;
}

export const DEFAULT_LIMIT = 50;

export const populateFromQS = (state: Store, qs: string): Store => {
  qs = qs.replace(/^\?/, "");
  if (!qs) {
    return state;
  }
  const newState: Store = {
    ...state,
    filters: {
      ...state.filters,
    },
  };
  const queryParams: { [key: string]: string } = qs
    .split("&")
    .reduce((acc, pairStr) => {
      const [key, value] = pairStr.split("=");
      return { ...acc, [key]: decodeURIComponent(value) };
    }, {});
  if (Number(queryParams.skip)) {
    newState.skip = Number(queryParams.skip);
  }
  if (Number(queryParams.limit)) {
    newState.limit = Number(queryParams.limit);
  }
  if (queryParams.techStack) {
    newState.filters.techStack = queryParams.techStack.split(
      ","
    ) as TechStackValue[];
  }
  if (queryParams.cities) {
    newState.filters.cities = queryParams.cities.split(",") as CityValue[];
  }
  return newState;
};

export const defaultStore: Store = {
  candidates: [],
  skip: 0,
  limit: DEFAULT_LIMIT,
  totalCount: 0,
  filters: {
    cities: [],
    techStack: [],
  },
};

interface SetCandidatesAction {
  type: "setCandidates";
  payload: { candidates: Candidate[]; totalCount: number };
}

interface NextPageAction {
  type: "nextPage";
}

interface PrevPageAction {
  type: "prevPage";
}

interface FilterCitiesAction {
  type: "filterCities";
  payload: CityValue[];
}

interface FilterTechStackAction {
  type: "filterTechStack";
  payload: TechStackValue[];
}

interface PopulateFromQSAction {
  type: "populateFromQS";
  payload: string;
}

export type Action =
  | SetCandidatesAction
  | NextPageAction
  | PrevPageAction
  | FilterCitiesAction
  | FilterTechStackAction
  | PopulateFromQSAction;

export const candidatesReducer: Reducer<Store, Action> = (state, action) => {
  switch (action.type) {
    case "setCandidates": {
      return {
        ...state,
        candidates: action.payload.candidates,
        totalCount: action.payload.totalCount,
      };
    }
    case "nextPage": {
      return {
        ...state,
        skip: Math.min(state.skip + state.limit, state.totalCount),
      };
    }
    case "prevPage": {
      return {
        ...state,
        skip: Math.max(state.skip - state.limit, 0),
      };
    }
    case "filterCities": {
      return {
        ...state,
        skip: 0,
        filters: {
          ...state.filters,
          cities: action.payload,
        },
      };
    }
    case "filterTechStack": {
      return {
        ...state,
        skip: 0,
        filters: {
          ...state.filters,
          techStack: action.payload,
        },
      };
    }
    case "populateFromQS": {
      return populateFromQS(state, action.payload);
    }
    default:
      return state;
  }
};
