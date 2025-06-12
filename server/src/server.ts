import express from "express";
import { choices } from "./constants.js";
import { getWinner, mapNumberToChoice } from "./utils.js";
import { Choice } from "./types.js";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/choices", (req, res) => {
  res.json(choices);
});

app.get("/api/choice", async (req, res) => {
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

app.post("/api/play", async (req, res) => {
  try {
    const computerChoiceResponse = await fetch(
      `http://localhost:${process.env.PORT}/api/choice`
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

app.use(express.static(join(__dirname, "../../client/dist")));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log("App is listening on port 3010....");
});

export default app;
