import type { GameResult } from "../../api/play";
import { ChoiceCardsConfig } from "../../Home/Home.constants";
import type { TChoice, TChoiceName } from "../../types/types";
import { Choice } from "../Choice/Choice";
import styles from "./Result.module.scss";

interface TResult {
  player?: TChoiceName;
  computer?: TChoiceName;
  result: "win" | "lose" | "tie";
}

export const Result = ({ player, computer, result }: TResult) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>you</h2>
        <Choice
          title={player}
          imageSrc={player && ChoiceCardsConfig[player].image}
        />
      </div>
      <span className={styles.result}>{result}</span>
      <div className={styles.card}>
        <h2>computer</h2>

        <Choice
          title={computer}
          imageSrc={computer && ChoiceCardsConfig[computer].image}
        />
      </div>
    </div>
  );
};
