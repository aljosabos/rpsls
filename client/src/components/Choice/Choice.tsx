import styles from "./Choice.module.scss";

interface ChoiceProps {
  title?: string;
  imageSrc?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Choice = ({ title, imageSrc, disabled, onClick }: ChoiceProps) => {
  return (
    <div
      className={`${styles.card} ${disabled ? styles.disabled : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      <img src={imageSrc} alt={title} className={`${styles.image} `} />
      <p className={styles.title}>{title}</p>
    </div>
  );
};
