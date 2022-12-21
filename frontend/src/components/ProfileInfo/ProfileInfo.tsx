import UserInfo from "../UserInfo/UserInfo";
import UserFollowers from "../UserFollowers/UserFollowers";
import UserFollowings from "../UserFollowings/UserFollowings";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div className={styles.container}>
      <UserInfo />
      <UserFollowers />
      <UserFollowings />
    </div>
  );
};

export default ProfileInfo;
