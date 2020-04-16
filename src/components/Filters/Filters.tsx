import * as React from "react";
import { FilterCity } from "./FilterCity";
import styles from "./Filters.module.css";
import { FilterTechStack } from "./FilterTechStack";

export const Filters: React.FunctionComponent = () => (
  <div className={styles.Filters}>
    <FilterCity className={styles.Filter} />
    <FilterTechStack className={styles.Filter} />
  </div>
);
