import type { TChoiceName } from "../types/types";

export type TScoreEntry = IChoicesMade & {
  result: "win" | "lose" | "tie" | undefined;
};

export interface IChoicesMade {
  player: TChoiceName | undefined;
  computer: TChoiceName | undefined;
}
