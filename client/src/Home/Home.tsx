import { choices } from "../constants";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div>
      <p>Click to start the game</p>
      <button>Start</button>

      <ul className={styles.choices}>
        {choices.map((choice, index) => (
          <li key={index} className={styles.choice}>
            <button>{choice}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
