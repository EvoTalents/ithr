import * as React from "react";
import {
  techStackOptions,
  TechStackValue,
} from "../../store/candidates/techStack";

type TechStackMap = { [key in TechStackValue]?: string };

const techStackMap: TechStackMap = techStackOptions.reduce(
  (acc, ts) => ({
    ...acc,
    [ts.value]: ts.label,
  }),
  {}
);

interface Props {
  techStack: TechStackValue[];
}

export const TechStack: React.FunctionComponent<Props> = ({ techStack }) => (
  <div>{techStack.map((ts) => techStackMap[ts] || ts).join(", ")}</div>
);
