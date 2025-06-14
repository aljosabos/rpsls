import type { TChoiceName } from "../types/types";

export type TScoreEntry = IChoicesMade & {
  result?: TGameOutcome;
};

export interface IChoicesMade {
  player?: TChoiceName;
  computer?: TChoiceName;
}

export type TGameOutcome = "win" | "lose" | "tie";
