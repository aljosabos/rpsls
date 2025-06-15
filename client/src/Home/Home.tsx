import styles from "./Home.module.scss";
import { Choice } from "../components/Choice/Choice";
import { ChoiceCardsConfig } from "./Home.constants";
import { Gameplay } from "../components/Gameplay/Gameplay";
import { Score } from "../components/Score/Score";
import { Rules } from "../components/Rules/Rules";
import { useGame } from "../hooks/useGame";

export const Home = () => {
  const {
    availableChoices,
    choicesMade,
    results,
    score,
    isGameStarted,
    isLoading,
    controls,
  } = useGame();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <h1>Welcome to the Rock, Paper, Scissors, Lizard, Spock Game</h1>
          <p>{isGameStarted ? "Game started" : "Click to start the game"}</p>
          <button
            onClick={controls.start}
            className={styles.startBtn}
            disabled={isGameStarted}
          >
            {results ? "Play again" : "Play"}
          </button>

          {results && (
            <Gameplay
              player={choicesMade.player}
              computer={choicesMade.computer}
              result={results.results}
              onAnimationComplete={controls.addScore}
            />
          )}
        </div>

        {availableChoices.length > 0 && (
          <div className={styles.choicesWrapper}>
            <p>Choose one of the options:</p>
            <div className={styles.choices}>
              {availableChoices.map((choice) => (
                <Choice
                  key={choice.name}
                  title={choice.name}
                  imageSrc={ChoiceCardsConfig[choice.name].image}
                  disabled={isLoading}
                  onClick={() => controls.makeChoice(choice.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className={styles.sidebar}>
        {score.length > 0 && (
          <Score score={score} onClick={controls.clearScore} />
        )}
        <Rules />
      </aside>
    </div>
  );
};
