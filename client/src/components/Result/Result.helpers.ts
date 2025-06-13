import styles from "./Result.module.scss";

export const getCardClass = (
  side: "player" | "computer",
  result: "win" | "lose" | "tie"
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
