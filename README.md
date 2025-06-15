# ✊ Rock, Paper, Scissors, Lizard, Spock

A full-stack web game based on the extended version of Rock, Paper, Scissors — with **Lizard** and **Spock** added to the mix.

Play against the computer, get animated results, and track your score!

## 📁 Project Structure

```
project-root/
├── client/   # React + Vite frontend
└── server/   # Express backend
```

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rpsls.git
   cd rpsls
   ```

2. Install dependencies in both `client` and `server`:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Start the backend:

   ```bash
   cd server
   npm start
   ```

   The server runs on [http://localhost:3010](http://localhost:3010) by default.

4. Start the frontend:

   ```bash
   cd client
   npm run dev
   ```

   This starts the app on [http://localhost:5173](http://localhost:5173).

## 🕹️ How to Play

- Click "Play" to start a new round.
- Choose one of the options: Rock, Paper, Scissors, Lizard, or Spock.
- The computer picks randomly.
- The result is shown with animation and score is updated.
- Up to 10 latest results are displayed on the page and the score can be reset.
- 

## 🧰 Tech Stack

- **Frontend:** React19, Vite, SCSS Modules
- **Backend:** Node.js, Express, TypeScript
- **Dev Tools:** ESLint, TypeScript, Sass


## 📄 License

This project is open-source and free to use.
