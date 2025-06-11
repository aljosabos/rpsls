import express from "express";
import { choices } from "./constants.js";
import { getWinner, mapNumberToChoice } from "./utils.js";
import { Choice } from "./types.js";

const app = express();
app.use(express.json());

app.get("/choices", (req, res) => {
  res.json(choices);
});

app.get("/choice", async (req, res) => {
  try {
    const randomNumberResponse = await fetch(
      "https://codechallenge.boohma.com/random"
    );

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
    const computerChoiceResponse = await fetch("http://localhost:3010/choice");
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

app.listen(3010, () => {
  console.log("App is listening on port 3010....");
});

export default app;
