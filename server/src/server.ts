import express from "express";
import { choices } from "./constants.js";
import { getWinner, mapNumberToChoice } from "./utils.js";
import { Choice } from "./types.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/choices", (req, res) => {
  res.json(choices);
});

app.get("/choice", async (req, res) => {
  try {
    const url = process.env.RANDOM_NUMBER_URL!;
    const randomNumberResponse = await fetch(url);

    const data = await randomNumberResponse.json();
    const { random_number } = data;

    if (random_number) {
      const computerChoice = mapNumberToChoice(random_number);
      res.json(computerChoice);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/play", async (req, res) => {
  try {
    const computerChoiceResponse = await fetch(
      `http://localhost:${process.env.PORT}/choice`
    );
    const computerChoice: Choice = await computerChoiceResponse.json();

    const { player: playerChoice } = req.body;

    const playerChoiceObj: Choice = choices.filter(
      (choice) => choice.name === playerChoice
    )?.[0];

    const results = getWinner(playerChoiceObj, computerChoice);

    res.json({
      results,
      player: playerChoiceObj.id,
      computerChoice: computerChoice.id,
    });
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log("App is listening on port 3010....");
});

export default app;
