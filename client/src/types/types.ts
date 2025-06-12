import type { possibleChoices } from "../constants";

export type Choice = {
  id: number;
  name: "rock" | "paper" | "scissors" | "lizard" | "spock";
};

export type ChoiceName = (typeof possibleChoices)[number];
