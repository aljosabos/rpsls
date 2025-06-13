import type { TChoiceName } from "../../types/types";

export const gameChoices: TChoiceName[] = [
  "rock",
  "paper",
  "scissors",
  "lizard",
  "spock",
];

export const resultColorMap: Record<"win" | "lose" | "tie", string> = {
  win: "#10B981",
  lose: "#EF4444",
  tie: "#BFDBFE",
};
