import * as React from "react";
import { citiesOptions, CityValue } from "../../store/candidates/cities";
import { useCandidates } from "../CandidatesProvider/CandidatesProvider";
import { FilterSelect } from "./FilterSelect";

const useCities = () => {
  const { cities, setCities } = useCandidates();
  return { cities, setCities };
};

interface Props {
  className?: string;
}

export const FilterCity: React.FunctionComponent<Props> = ({ className }) => {
  const { cities, setCities } = useCities();
  return (
    <div className={className}>
      <FilterSelect<CityValue>
        options={citiesOptions}
        value={cities}
        onChange={setCities}
        placeholder="Город"
      />
    </div>
  );
};
