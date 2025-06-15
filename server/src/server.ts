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

    if (random_number || random_number === 0) {
      const computerChoice = mapNumberToChoice(random_number);

      res.json(computerChoice);
    } else {
      res.status(500).json({ error: "Invalid random number response" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/play", async (req, res) => {
  try {
    const computerChoiceResponse = await fetch(
      `http://localhost:${process.env.PORT}/api/choice`
    );
    const computerChoice: Choice = await computerChoiceResponse.json();

    const { player: playerChoice } = req.body;

    if (!playerChoice) {
      res.status(400).json({ error: "Missing player choice" });
      return;
    }

    const playerChoiceData: Choice = choices.filter(
      (choice) => choice.name === playerChoice
    )?.[0];

    if (!playerChoiceData) {
      res.status(400).json({ error: "Invalid player choice" });
      return;
    }

    const results = getWinner(playerChoiceData, computerChoice);

    res.json({
      results,
      player: playerChoiceData.id,
      computerChoice: computerChoice.id,
    });
  } catch (err) {
    console.log(err);
  }
});

// serve react app
app.use(express.static(join(__dirname, "../../client/dist")));

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}....`);
});

export default app;
