import Paper from "../../public/images/paper.png";
import Rock from "../../public/images/rock.png";
import Scissors from "../../public/images/scissors.png";
import Lizard from "../../public/images/lizard.png";
import Spock from "../../public/images/spock.png";
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
