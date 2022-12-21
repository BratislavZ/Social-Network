import styles from "./LoadingSpinner.module.css";

interface Props {
  size?: string;
}

const LoadingSpinner = (props: Props) => {
  const spinnerStyle =
    props.size === "small"
      ? `${styles.loader} ${styles.small}`
      : `${styles.loader}`;

  return <div className={spinnerStyle}></div>;
};

export default LoadingSpinner;
