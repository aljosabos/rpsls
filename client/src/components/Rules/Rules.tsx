import styles from "./Rules.module.scss";
import RulesImg from "../../../public/images/rules.png";

export const Rules = () => {
  return (
    <div className={styles.rules}>
      <h2>Game rules</h2>
      <img src={RulesImg} alt="rules" className={styles.rulesImg} />

      <p>
        Scissors cuts Paper covers Rock crushes Lizard poisons Spock smashes
        Scissors decapitates Lizard eats Paper disproves Spock vaporizes Rock
        crushes Scissors
      </p>
    </div>
  );
};
