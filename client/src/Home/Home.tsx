import { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import type { TChoice, TChoiceName } from "../types/types";
import { getChoices } from "../api/choise";
import { playGame, type GameResult } from "../api/play";
import { Choice } from "../components/Choice/Choice";
import { ChoiceCardsConfig, ChoiceImages } from "./Home.constants";
import { Result } from "../components/Result/Result";

interface IChoicesMade {
  player: TChoiceName | undefined;
  computer: TChoiceName | undefined;
}

export const Home = () => {
  const [choices, setChoices] = useState<TChoice[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>();

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

  return (
    <div className={styles.container}>
      <div>
        <p>{isGameStarted ? "Game started" : "Click to start the game"}</p>
        <button
          onClick={handleStartGame}
          className={styles.startBtn}
          disabled={isGameStarted}
        >
          {gameResult ? "Play again" : "Play"}
        </button>

        {gameResult && (
          <Result
            player={choicesMade.player}
            computer={choicesMade.computer}
            result={gameResult.results}
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
  );
};
