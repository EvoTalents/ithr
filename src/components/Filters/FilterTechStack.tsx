import * as React from "react";
import { techStackOptions } from "../../store/candidates/techStack";
import { useCandidates } from "../CandidatesProvider/CandidatesProvider";
import { FilterSelect } from "./FilterSelect";

const useTechStack = () => {
  const { techStack, setTechStack } = useCandidates();
  return { techStack, setTechStack };
};

interface Props {
  className?: string;
}

export const FilterTechStack: React.FunctionComponent<Props> = ({
  className,
}) => {
  const { techStack, setTechStack } = useTechStack();
  return (
    <div className={className}>
      <FilterSelect
        options={techStackOptions}
        value={techStack}
        onChange={setTechStack}
        placeholder="Специализация"
      />
    </div>
  );
};
