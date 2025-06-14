import type { TChoiceName } from "../../types/types";

export const gameChoices: TChoiceName[] = [
  "rock",
  "paper",
  "scissors",
  "lizard",
  "spock",
];

export const resultColorMap: Record<"win" | "lose" | "tie", string> = {
  win: "#05d590",
  lose: "#f14040",
  tie: "#7bb2f7",
};
