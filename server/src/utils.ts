import { choices, winningMap } from "./constants.js";
import { Choice, GameResult } from "./types.js";

export const mapNumberToChoice = (num: number) => {
  const index = num % choices.length;
  return choices[index];
};

export const getWinner = (
  playerChoice: Choice,
  computerChoice: Choice
): GameResult => {
  if (playerChoice.name === computerChoice.name) {
    return "tie";
  }

  console.log(playerChoice);
  console.log(computerChoice);

  if (winningMap[playerChoice.name].includes(computerChoice.name)) {
    return "win";
  } else {
    return "lose";
  }
};
