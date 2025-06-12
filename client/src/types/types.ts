import type { possibleChoices } from "../constants";

export type TChoice = {
  id: number;
  name: TChoiceName;
};

export type TChoiceName = "rock" | "paper" | "scissors" | "lizard" | "spock";

// export type TChoiceName = (typeof possibleChoices)[number];
