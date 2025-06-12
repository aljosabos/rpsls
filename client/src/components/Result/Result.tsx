import { useEffect, useMemo, useState } from "react";
import { ChoiceCardsConfig } from "../../Home/Home.constants";
import type { TChoiceName } from "../../types/types";
import { Choice } from "../Choice/Choice";
import styles from "./Result.module.scss";

interface TResult {
  player?: TChoiceName;
  computer?: TChoiceName;
  result: "win" | "lose" | "tie";
}

const options: TChoiceName[] = ["rock", "paper", "scissors", "lizard", "spock"];

export const Result = ({ player, computer, result }: TResult) => {
  const [showComputerChoice, setShowComputerChoice] = useState(false);
  const [currentRandomChoice, setCurrentRandomChoice] = useState<TChoiceName>();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 5);
      setCurrentRandomChoice(options[randomNum]);
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowComputerChoice(true);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const computerImage =
    ChoiceCardsConfig[currentRandomChoice ?? computer!]?.image;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>you</h2>
        <Choice
          title={player}
          imageSrc={player && ChoiceCardsConfig[player].image}
        />
      </div>
      <span className={styles.result}>
        {showComputerChoice ? result : "???"}
      </span>
      <div className={styles.card}>
        <h2>computer</h2>

        <Choice title={computer} imageSrc={computerImage} />
      </div>
    </div>
  );
};
