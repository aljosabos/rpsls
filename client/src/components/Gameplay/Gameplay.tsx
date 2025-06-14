import { useEffect, useState } from "react";

import { ChoiceCardsConfig } from "@/Home/Home.constants";
import type { TChoiceName } from "@/types/types";
import { Choice } from "@components/Choice/Choice";
import styles from "./Gameplay.module.scss";
import { getCardClass } from "./Gameplay.helpers";

import {
  ANIMATION_DURATION,
  ANIMATION_INTERVAL,
  gameChoices,
  resultColorMap,
} from "./Gameplay.constants";

import type { TGameOutcome } from "@/Home/Home.types";

interface IGameplayProps {
  player?: TChoiceName;
  computer?: TChoiceName;
  result: TGameOutcome;
  onAnimationComplete: () => void;
}

export const Gameplay = ({
  player,
  computer,
  result,
  onAnimationComplete,
}: IGameplayProps) => {
  //Even though the result is available immediately,revealing the computers choice is delayed to show the animation
  const [isComputerChoiceRevealed, setIsComputerChoiceRevealed] =
    useState(false);
  // temporary random choice shown while computer is 'thinking'
  const [animatedComputerChoice, setAnimatedComputerChoice] =
    useState<TChoiceName>();

  const computerKey = isComputerChoiceRevealed
    ? computer
    : animatedComputerChoice;

  const computerImage = computerKey
    ? ChoiceCardsConfig[computerKey]?.image
    : undefined;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 5);
      setAnimatedComputerChoice(gameChoices[randomNum]);
    }, ANIMATION_INTERVAL);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsComputerChoiceRevealed(true);
      onAnimationComplete();
    }, ANIMATION_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onAnimationComplete]);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${
          isComputerChoiceRevealed && getCardClass("player", result)
        }`}
      >
        <h2 className={styles.cardTitle}>
          you {isComputerChoiceRevealed && result !== "tie" && result}
        </h2>
        <Choice
          title={player}
          imageSrc={player && ChoiceCardsConfig[player].image}
        />
      </div>

      <span className={styles.result}>
        {isComputerChoiceRevealed ? (
          <div style={{ color: resultColorMap[result] }}>{result}</div>
        ) : (
          <div className={styles.loader} />
        )}
      </span>

      <div
        className={`${styles.card} ${
          isComputerChoiceRevealed && getCardClass("computer", result)
        }`}
      >
        <h2 className={styles.cardTitle}>computer</h2>
        <Choice title={computer} imageSrc={computerImage} />
      </div>
    </div>
  );
};
