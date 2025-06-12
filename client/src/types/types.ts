import type { possibleChoices } from "../constants";

export type TChoice = {
  id: number;
  name: "rock" | "paper" | "scissors" | "lizard" | "spock";
};

export type TChoiceName = (typeof possibleChoices)[number];
