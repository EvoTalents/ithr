import React from "react";
import { CandidatesList } from "../CandidatesList/CandidatesList";
import { CandidatesProvider } from "../CandidatesProvider/CandidatesProvider";
import { Filters } from "../Filters/Filters";
import { Pagination } from "../Pagination/Pagination";


export const Candidates: React.FC = () => (
  <CandidatesProvider>
    <Filters />
    <CandidatesList />
    <Pagination />
  </CandidatesProvider>
);
