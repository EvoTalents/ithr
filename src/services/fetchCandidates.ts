import {Candidate, CandidateRaw, DEFAULT_LIMIT} from '../store/candidates/candidatesReducer';
import { CityValue } from "../store/candidates/cities";
import { TechStackValue } from "../store/candidates/techStack";

interface CandidatesResponseBase<T> {
  items: T[];
  totalCount: number;
  skip: number;
  limit: number;
}

interface CandidatesResponse extends CandidatesResponseBase<Candidate> {}

interface CandidateResponseRaw extends CandidatesResponseBase<CandidateRaw> {
  items: CandidateRaw[];
}

const candidateMapper = ({
  _id,
  techStack,
  cities,
  summary,
  salary,
  cv,
  linkedIn,
  english,
  currentPosition,
  desiredPosition,
  contacts,
  name,
  years,
}: CandidateRaw): Candidate => ({
  id: _id,
  name,
  summary,
  salary,
  linkedIn,
  currentPosition,
  desiredPosition,
  cities: (typeof cities === "string" ? [cities] : cities || []) as CityValue[],
  techStack: (typeof techStack === "string"
    ? [techStack]
    : techStack || []) as TechStackValue[],
  contacts,
  cv,
  english,
  years,
});
const BASE_URL = "https://hr0153.wixsite.com/ithr/_functions/candidates";
const BASE_DEV_URL =
  "https://hr0153.wixsite.com/ithr/_functions-dev/candidates";

interface FetchCandidatesOptions {
  skip?: number;
  limit?: number;
  filters?: {
    cities?: CityValue[];
    techStack?: string[];
  };
}

export const fetchCandidates = ({
  skip = 0,
  limit = DEFAULT_LIMIT,
  filters: { cities = [], techStack = [] } = { cities: [], techStack: [] },
}: FetchCandidatesOptions): Promise<CandidatesResponse> => {
  // const url = new URL(BASE_URL);
  const url = new URL(BASE_DEV_URL);

  if (skip) {
    url.searchParams.append("skip", skip.toString());
  }
  if (limit && limit !== DEFAULT_LIMIT) {
    url.searchParams.append("limit", limit.toString());
  }
  if (cities && cities.length) {
    url.searchParams.append("cities", cities.join(","));
  }
  if (techStack && techStack.length) {
    url.searchParams.append("techStack", techStack.join(","));
  }
  return fetch(url.href)
    .then((response) => {
      if (!response.ok) {
        throw Error("could not fetch candidates");
      }
      return response;
    })
    .then((response) => response.json())
    .then(
      ({
        items,
        limit,
        skip,
        totalCount,
      }: CandidateResponseRaw): CandidatesResponse => ({
        items: items.map(candidateMapper),
        limit,
        totalCount,
        skip,
      })
    );
};
