import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import type { TChoice, TChoiceName } from "../types/types";
import { getChoices } from "../api/choise";
import { playGame, type TGameResult } from "../api/play";
import { Choice } from "../components/Choice/Choice";
import { ChoiceCardsConfig, MAX_SCORE } from "./Home.constants";
import { Gameplay } from "../components/Gameplay/Gameplay";
import { Score } from "../components/Score/Score";
import type { IChoicesMade, TScoreEntry } from "./Home.types";
import { Rules } from "../components/Rules/Rules";

export const Home = () => {
  const [choices, setChoices] = useState<TChoice[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameResult, setGameResult] = useState<TGameResult>();
  const [score, setScore] = useState<TScoreEntry[]>([]);

  useEffect(() => {
    if (!isGameStarted) return;

    getChoices().then((data) => {
      if (data) setChoices(data);
    });
  }, [isGameStarted]);

  const choicesMade: IChoicesMade = useMemo(() => {
    const playerChoice = choices.find(
      (choice) => choice.id === gameResult?.player
    );
    const computerChoice = choices.find(
      (choice) => choice.id === gameResult?.computerChoice
    );

    return {
      player: playerChoice?.name,
      computer: computerChoice?.name,
    };
  }, [choices, gameResult?.computerChoice, gameResult?.player]);

  const handleStartGame = () => {
    if (isGameStarted) return;

    setIsGameStarted(true);
    setGameResult(undefined);
  };

  const handleAddScore = useCallback(() => {
    const newScore = {
      player: choicesMade.player,
      computer: choicesMade.computer,
      result: gameResult?.results,
    };

    setIsGameStarted(false);

    setScore((currScore) => {
      let updatedScore: TScoreEntry[] = [];
      // up to 10 latest results are displayed
      if (currScore.length >= MAX_SCORE) {
        updatedScore = [...currScore, newScore].slice(1);
      } else {
        updatedScore = [...currScore, newScore];
      }

      return updatedScore;
    });
  }, [choicesMade.computer, choicesMade.player, gameResult?.results]);

  const handleClearScore = () => {
    setScore([]);
  };

  const handlePlayGame = async (name: TChoiceName) => {
    const data = await playGame(name);

    if (data) {
      setGameResult(data);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <h1>Welcome to the Rock, Paper, Scissors, Lizard, Spock Game</h1>
          <p>{isGameStarted ? "Game started" : "Click to start the game"}</p>
          <button
            onClick={handleStartGame}
            className={styles.startBtn}
            disabled={isGameStarted}
          >
            {gameResult ? "Play again" : "Play"}
          </button>

          {gameResult && (
            <Gameplay
              player={choicesMade.player}
              computer={choicesMade.computer}
              result={gameResult.results}
              onAnimationComplete={handleAddScore}
            />
          )}
        </div>

        {isGameStarted && (
          <div className={styles.choicesWrapper}>
            <p>Choose one of the options:</p>
            <div className={styles.choices}>
              {choices?.map((choice) => (
                <Choice
                  key={choice.name}
                  title={choice.name}
                  imageSrc={ChoiceCardsConfig[choice.name].image}
                  onClick={() => handlePlayGame(choice.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className={styles.sidebar}>
        {score.length > 0 && <Score score={score} onClick={handleClearScore} />}
        <Rules />
      </aside>
    </div>
  );
};
