import React from "react";
import classNames from "classnames";
import { useCandidates } from "../CandidatesProvider/CandidatesProvider";
import styles from "./Pagination.module.css";

const usePagination = () => {
  const { nextPage, prevPage, skip, limit, totalCount } = useCandidates();
  return { nextPage, prevPage, skip, limit, totalCount };
};

const PageButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
}> = ({ children, onClick }) => (
  <button onClick={onClick} className={classNames("button", styles.pageButton)}>
    {children}
  </button>
);

export const Pagination: React.FunctionComponent = () => {
  const { nextPage, prevPage, skip, limit, totalCount } = usePagination();
  const hasPrevPage = skip > 0;
  const hasNextPage = skip + limit < totalCount;
  return (
    <div className={styles.Pagination}>
      {hasPrevPage ? <PageButton onClick={prevPage}>&lt;</PageButton> : null}
      {hasNextPage ? <PageButton onClick={nextPage}>&gt;</PageButton> : null}
    </div>
  );
};
