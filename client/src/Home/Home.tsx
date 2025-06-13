import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import type { TChoice, TChoiceName } from "../types/types";
import { getChoices } from "../api/choise";
import { playGame, type GameResult } from "../api/play";
import { Choice } from "../components/Choice/Choice";
import { ChoiceCardsConfig } from "./Home.constants";
import { Gameplay } from "../components/Gameplay/Gameplay";
import { Score } from "../components/Score/Score";
import Rules from "../../public/images/rules.png";

interface IChoicesMade {
  player: TChoiceName | undefined;
  computer: TChoiceName | undefined;
}

export type TScoreEntry = IChoicesMade & {
  result: "win" | "lose" | "tie" | undefined;
};

export const Home = () => {
  const [choices, setChoices] = useState<TChoice[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>();

  const [score, setScore] = useState<TScoreEntry[]>([]);

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

  const handleAddScore = useCallback(() => {
    setScore((currScore) => {
      const newScore = {
        player: choicesMade.player,
        computer: choicesMade.computer,
        result: gameResult?.results,
      };
      let updatedScore: TScoreEntry[] = [];

      if (currScore.length >= 10) {
        updatedScore = [...currScore, newScore].slice(1);
      } else {
        updatedScore = [...currScore, newScore];
      }

      return updatedScore;
    });
  }, [choicesMade.computer, choicesMade.player, gameResult?.results]);

  const handleScoreReset = () => {
    setScore([]);
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
        <div>
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
      </div>
      <aside className={styles.sidebar}>
        <Score score={score} onClick={handleScoreReset} />

        <div className={styles.rules}>
          <h2>Game rules</h2>
          <img src={Rules} alt="rules" className={styles.rulesImg} />

          <p>
            Scissors cuts Paper covers Rock crushes Lizard poisons Spock smashes
            Scissors decapitates Lizard eats Paper disproves Spock vaporizes
            Rock crushes Scissors
          </p>
        </div>
      </aside>
    </div>
  );
};
