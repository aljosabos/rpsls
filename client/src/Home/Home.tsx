import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import type { Choice } from "../types/types";
import { getChoices } from "../api/choise";

export const Home = () => {
  const [choices, setChoices] = useState<Choice[]>([]);

  useEffect(() => {
    getChoices().then((data) => {
      if (data) setChoices(data);
    });
  }, []);

  return (
    <div>
      <p>Click to start the game</p>
      <button>Start</button>

      <ul className={styles.choices}>
        {choices?.map((choice, index) => (
          <li key={index} className={styles.choice}>
            <button>{choice.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
