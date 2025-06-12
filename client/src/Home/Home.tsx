import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import type { TChoice, TChoiceName } from "../types/types";
import { getChoices } from "../api/choise";
import { playGame, type GameResult } from "../api/play";
import { possibleChoices } from "../constants";
import { Choice } from "../components/Choice/Choice";
import { ChoiceImages } from "./Home.constants";

export const Home = () => {
  const [choices, setChoices] = useState<TChoice[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>();

  useEffect(() => {
    if (!isGameStarted) return;

    getChoices().then((data) => {
      if (data) setChoices(data);
    });
  }, [isGameStarted]);

  const handlePlayGame = async (name: TChoiceName) => {
    const data = await playGame(name);

    if (data) {
      setGameResult(data);
      setIsGameStarted(false);
    }
  };

  const handleStartGame = () => {
    if (isGameStarted) return;
    setIsGameStarted(true);
    setGameResult(undefined);
  };

  console.log(choices);

  return (
    <div className={styles.container}>
      <div>
        <p>{isGameStarted ? "Game started" : "Click to start the game"}</p>
        <button
          onClick={handleStartGame}
          className={styles.startBtn}
          disabled={isGameStarted}
        >
          Start
        </button>

        {gameResult && (
          <div className={styles.result}>
            <p>
              You played <b>{possibleChoices[gameResult.player - 1]}</b>
            </p>
            <p>
              Computer played
              <b>{possibleChoices[gameResult.computerChoice - 1]}</b>
            </p>

            <h2>{gameResult.results}</h2>
          </div>
        )}
      </div>

      {isGameStarted && (
        <div className={styles.choicesWrapper}>
          <p>Choose one of the options:</p>

          <div className={styles.choices}>
            {choices?.map((choice, index) => (
              <Choice
                key={choice.name}
                title={choice.name}
                imageSrc={ChoiceImages[index]}
                onClick={() => handlePlayGame(choice.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
