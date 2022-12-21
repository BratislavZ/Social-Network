import { useAppSelector } from "../../store/hooks/hooks";
import useNavigation from "../../hooks/useNavigation";

import Avatar from "../Avatar/Avatar";
import styles from "./Toolbar.module.css";

const Toolbar = () => {
  const profileImg = useAppSelector((state) => state.user.profilePicture);

  const { homePageHandler, profilePageHandler } = useNavigation();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.logo} onClick={homePageHandler}>
          Social Network
        </span>
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <span className={styles.link} onClick={homePageHandler}>
            Home
          </span>
          <span className={styles.link} onClick={profilePageHandler}>
            Profile
          </span>
        </div>
        <Avatar imgSrc={profileImg} />
      </div>
    </div>
  );
};

export default Toolbar;
