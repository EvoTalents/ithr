import React from "react";
import { citiesOptions, CityValue } from "../../store/candidates/cities";

type CitiesMap = { [key in CityValue]?: string };

const citiesMap: CitiesMap = citiesOptions.reduce(
  (acc, city) => ({
    ...acc,
    [city.value]: city.label,
  }),
  {}
);

export const Cities: React.FC<{ cities: CityValue[] }> = ({ cities }) => {
  return <div>{cities.map((c) => citiesMap[c] || c).join(", ")}</div>;
};
