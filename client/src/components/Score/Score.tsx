import type { TScoreEntry } from "../../Home/Home";
import styles from "./Score.module.scss";

interface IScore {
  score: TScoreEntry[];
}

export const Score = ({ score }: IScore) => {
  return (
    <div className={styles.container}>
      <h2>Game score</h2>
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
            <td>{sc.result}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
