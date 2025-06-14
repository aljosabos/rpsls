import type { TScoreEntry } from "../../Home/Home.types";
import { resultColorMap } from "../Gameplay/Gameplay.constants";
import styles from "./Score.module.scss";

interface IScore {
  score: TScoreEntry[];
  onClick: () => void;
}

export const Score = ({ score, onClick }: IScore) => {
  return (
    <div className={styles.container}>
      <div className={styles.scoreHeader}>
        <h2>Game score</h2>
        {!!score.length && <button onClick={onClick}>Clear score</button>}
      </div>
      <table className={styles.table}>
        <tr>
          <th>Player</th>
          <th>Computer</th>
          <th>Result</th>
        </tr>

        {score?.map((sc, i) => (
          <tr key={i}>
            <td>{sc.player}</td>
            <td>{sc.computer}</td>
            <td
              style={{ color: sc.result ? resultColorMap[sc.result] : "" }}
              className={styles.result}
            >
              {sc.result}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
