import express from "express";

const app = express();

app.get("/choices", (req, res) => {
  const choices = [
    { id: 1, name: "rock" },
    { id: 2, name: "paper" },
    { id: 3, name: "scissors" },
    { id: 4, name: "lizard" },
    { id: 5, name: "spock" },
  ];
  res.json(choices);
});

app.post("/play", (req, res) => {
  res.json("Play");
});

app.listen(3010, () => {
  console.log("App is listening on port 3010....");
});

export default app;
