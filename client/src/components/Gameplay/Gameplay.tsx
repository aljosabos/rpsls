import { useEffect, useMemo, useState } from "react";
import { ChoiceCardsConfig } from "../../Home/Home.constants";
import type { TChoiceName } from "../../types/types";
import { Choice } from "../Choice/Choice";
import styles from "./Gameplay.module.scss";
import { getCardClass } from "./Gameplay.helpers";
import { gameChoices, resultColorMap } from "./Gameplay.constants";

interface IGameplayProps {
  player?: TChoiceName;
  computer?: TChoiceName;
  result: "win" | "lose" | "tie";
}

export const Gameplay = ({ player, computer, result }: IGameplayProps) => {
  const [showComputerChoice, setShowComputerChoice] = useState(false);
  const [currentRandomChoice, setCurrentRandomChoice] = useState<TChoiceName>();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 5);
      setCurrentRandomChoice(gameChoices[randomNum]);
    }, 80);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowComputerChoice(true);
    }, 1700);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const computerImage = useMemo(() => {
    return ChoiceCardsConfig[
      showComputerChoice ? computer! : currentRandomChoice!
    ]?.image;
  }, [computer, currentRandomChoice, showComputerChoice]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${
          showComputerChoice && getCardClass("player", result)
        }`}
      >
        <h2>you {showComputerChoice && result !== "tie" && result}</h2>
        <Choice
          title={player}
          imageSrc={player && ChoiceCardsConfig[player].image}
        />
      </div>
      <span className={styles.result}>
        {showComputerChoice ? (
          <div style={{ color: resultColorMap[result] }}>{result}</div>
        ) : (
          <div className={styles.loader} />
        )}
      </span>
      <div
        className={`${styles.card} ${
          showComputerChoice && getCardClass("computer", result)
        }`}
      >
        <h2>computer</h2>
        <Choice title={computer} imageSrc={computerImage} />
      </div>
    </div>
  );
};
