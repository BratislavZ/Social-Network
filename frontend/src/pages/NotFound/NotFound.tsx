import { useNavigate } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Page Not Found</h1>
      <section className={styles["error-container"]}>
        <span>4</span>
        <span>
          <span className={styles["screen-reader-text"]}>0</span>
        </span>
        <span>4</span>
      </section>
      <div
        className={styles["home-btn"]}
        onClick={() => navigate("/", { replace: true })}
      >
        Home
      </div>
    </div>
  );
};

export default NotFound;
