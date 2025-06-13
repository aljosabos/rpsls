import styles from "./Score.module.scss";

export const Score = () => {
  return (
    <div className={styles.container}>
      <h2>Game score</h2>
      <table className={styles.table}>
        <tr>
          <th>Player</th>
          <th>Computer</th>
          <th>Result</th>
        </tr>

        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>

        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>

        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
        <tr>
          <td>paper</td>
          <td>scissors</td>
          <td>lost</td>
        </tr>
      </table>
    </div>
  );
};
