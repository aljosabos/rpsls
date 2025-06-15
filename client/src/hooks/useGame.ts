import { useCallback, useEffect, useMemo, useState } from "react";
import type { TChoice, TChoiceName } from "../types/types";
import { playGame, type TGameResult } from "../api/play";
import type { IChoicesMade, TScoreEntry } from "../Home/Home.types";
import { getChoices } from "../api/choise";
import { MAX_SCORE } from "../Home/Home.constants";

export const useGame = () => {
  const [availableChoices, setAvailableChoices] = useState<TChoice[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [results, setResults] = useState<TGameResult>();
  const [score, setScore] = useState<TScoreEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isGameStarted) return;

    getChoices().then((data) => {
      if (data) setAvailableChoices(data);
    });
  }, [isGameStarted]);

  const choicesMade: IChoicesMade = useMemo(() => {
    const playerChoice = availableChoices.find(
      (choice) => choice.id === results?.player
    );
    const computerChoice = availableChoices.find(
      (choice) => choice.id === results?.computerChoice
    );

    return {
      player: playerChoice?.name,
      computer: computerChoice?.name,
    };
  }, [availableChoices, results?.computerChoice, results?.player]);

  // GAME CONTROLS

  const start = () => {
    if (isGameStarted) return;

    setIsGameStarted(true);
    setResults(undefined);
  };

  const makeChoice = async (name: TChoiceName) => {
    if (!isGameStarted) return;

    setIsLoading(true);
    const data = await playGame(name);

    if (data) {
      setResults(data);
    }
  };

  const addScore = useCallback(() => {
    const newScore = {
      player: choicesMade.player,
      computer: choicesMade.computer,
      result: results?.results,
    };

    setScore((currScore) => {
      let updatedScore: TScoreEntry[] = [];
      // up to 10 latest results are displayed
      if (currScore.length >= MAX_SCORE) {
        updatedScore = [...currScore, newScore].slice(1);
      } else {
        updatedScore = [...currScore, newScore];
      }

      setIsGameStarted(false);
      setIsLoading(false);

      return updatedScore;
    });
  }, [choicesMade, results?.results]);

  const clearScore = () => {
    setScore([]);
  };

  return {
    isGameStarted,
    isLoading,
    availableChoices,
    choicesMade,
    results,
    score,

    controls: {
      start,
      makeChoice,
      addScore,
      clearScore,
    },
  };
};
