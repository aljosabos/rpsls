import type { TGameOutcome } from "../../Home/Home.types";
import type { TChoiceName } from "../../types/types";

export const gameChoices: TChoiceName[] = [
  "rock",
  "paper",
  "scissors",
  "lizard",
  "spock",
];

export const resultColorMap: Record<TGameOutcome, string> = {
  win: "#05d590",
  lose: "#f14040",
  tie: "#7bb2f7",
};

export const ANIMATION_INTERVAL = 80;
export const ANIMATION_DURATION = 1500;
