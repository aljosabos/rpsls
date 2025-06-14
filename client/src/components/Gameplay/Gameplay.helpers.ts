import type { TGameOutcome } from "../../Home/Home.types";
import styles from "./Gameplay.module.scss";

export const getCardClass = (
  side: "player" | "computer",
  result: TGameOutcome
) => {
  const resultClassMap = {
    player: {
      win: styles.cardWin,
      lose: styles.cardLose,
      tie: styles.cardTie,
    },
    computer: {
      win: styles.cardLose,
      lose: styles.cardWin,
      tie: styles.cardTie,
    },
  };

  return `${styles.card} ${resultClassMap[side][result]}`;
};
