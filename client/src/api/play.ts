import type { TGameOutcome } from "../Home/Home.types";
import type { TChoiceName } from "../types/types";

export type TGameResult = {
  results: TGameOutcome;
  player: number;
  computerChoice: number;
};

export const playGame = async (
  name: TChoiceName
): Promise<TGameResult | undefined> => {
  try {
    const response = await fetch("/api/play", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player: name }),
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
