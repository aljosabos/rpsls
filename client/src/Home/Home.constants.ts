import Paper from "../assets/paper.png";
import Rock from "../assets/rock.png";
import Scissors from "../assets/scissors.png";
import Lizard from "../assets/lizard.png";
import Spock from "../assets/spock.png";
import type { TChoiceName } from "../types/types";

export const ChoiceCardsConfig: Record<
  TChoiceName,
  { title: string; image: string }
> = {
  rock: {
    title: "Rock",
    image: Rock,
  },
  paper: {
    title: "Paper",
    image: Paper,
  },
  scissors: {
    title: "Scissors",
    image: Scissors,
  },
  lizard: {
    title: "Lizard",
    image: Lizard,
  },
  spock: {
    title: "Spock",
    image: Spock,
  },
};

export const MAX_SCORE = 10;
