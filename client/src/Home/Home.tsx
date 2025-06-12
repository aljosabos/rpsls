import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import type { Choice, ChoiceName } from "../types/types";
import { getChoices } from "../api/choise";
import { playGame, type GameResult } from "../api/play";
import { possibleChoices } from "../constants";

export const Home = () => {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>();

  useEffect(() => {
    if (!isGameStarted) return;

    getChoices().then((data) => {
      if (data) setChoices(data);
    });
  }, [isGameStarted]);

  const handlePlayGame = async (name: ChoiceName) => {
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

  return (
    <div className={styles.container}>
      <div>
        <p>Click to start the game</p>
        <button onClick={handleStartGame} className={styles.startBtn}>
          Start
        </button>

        {gameResult && (
          <div className={styles.result}>
            <p>
              Computer played{" "}
              <b>{possibleChoices[gameResult.computerChoice]}</b>
            </p>

            <p>
              You played <b>{possibleChoices[gameResult.player]}</b>
            </p>
            <h2>{gameResult.results}</h2>
          </div>
        )}
      </div>

      {isGameStarted && (
        <div>
          <p>Choose one of the options</p>
          <ul className={styles.choices}>
            {choices?.map((choice, index) => (
              <li key={index} className={styles.choice}>
                <button onClick={() => handlePlayGame(choice.name)}>
                  {choice.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
