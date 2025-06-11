import { choices } from "./constants.js";

export type Choice = {
  id: number;
  name: "rock" | "paper" | "scissors" | "lizard" | "spock";
};

export type ChoiceName = (typeof choices)[number]["name"];

export type GameResult = "win" | "lose" | "tie";
