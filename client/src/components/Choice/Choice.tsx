import styles from "./Choice.module.scss";

interface ChoiceProps {
  title?: string;
  imageSrc?: string;
  className?: string;
  onClick?: () => void;
}

export const Choice = ({ title, imageSrc, onClick }: ChoiceProps) => {
  return (
    <div className={`${styles.card}`} onClick={onClick}>
      <img src={imageSrc} alt={title} className={`${styles.image} `} />
      <p className={styles.title}>{title}</p>
    </div>
  );
};
