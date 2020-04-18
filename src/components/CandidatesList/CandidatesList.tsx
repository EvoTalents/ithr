import * as React from "react";
import { useCandidates } from "../CandidatesProvider/CandidatesProvider";
import { Cities } from "../Cities/Cities";
import { TechStack } from "../TechStack/TechStack";
import styles from "./CandidatesList.module.css";

export const CandidatesList: React.FC = () => {
  const { candidates } = useCandidates();
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Специализация</th>
          <th>Город</th>
          <th>Текущая позиция</th>
          <th>Желаемая позиция</th>
          <th className={styles.descColumn}>О себе</th>
          <th>English</th>
          <th>Контакты</th>
          <th>LinkedIn</th>
          <th>Резюме</th>
          <th>ЗП ожидания</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <tr key={candidate.id}>
            <td title={candidate.id}>{candidate.id.slice(0, 8)}</td>
            <td>{candidate.name || <i>По запросу</i>}</td>
            <td>
              <TechStack techStack={candidate.techStack} />
            </td>
            <td>
              <Cities cities={candidate.cities} />
            </td>
            <td>{candidate.currentPosition}</td>
            <td>{candidate.desiredPosition}</td>
            <td>{candidate.summary}</td>
            <td>{candidate.english}</td>
            <td>{candidate.contacts}</td>
            <td>
              {candidate.linkedIn ? (
                <a
                  href={candidate.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin
                </a>
              ) : null}
            </td>
            <td>
              {candidate.cv ? (
                <a
                  href={candidate.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CV
                </a>
              ) : null}
            </td>
            <td>{candidate.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
