import SocialNetworkAD from "../../assets/movies/socialNetwork.jpg";
import styles from "./RightBar.module.css";

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles["img-ad"]}>
          <img alt="" src={SocialNetworkAD} />
        </div>
      </div>
    </div>
  );
};

export default RightBar;
