import usePerson from "../../../hooks/usePerson";

import Button from "@mui/material/Button";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./Person.module.css";

type Props = {
  _id: string;
  username: string;
  profilePicture: string;
  followers: [];
};

const Person = (props: Props) => {
  const { _id, followers, profilePicture, username } = props;
  const {
    numOfFollowers,
    isSendingFollow,
    error,
    followHandler,
    showFollowersHandler,
    selectPersonHandler,
  } = usePerson(_id, followers);

  return (
    <div className={styles.card}>
      <img alt="" src={profilePicture} onClick={selectPersonHandler} />
      <span className={styles.username} onClick={selectPersonHandler}>
        {username}
      </span>
      <span className={styles.numOfFollowers} onClick={showFollowersHandler}>
        {numOfFollowers >= 0 &&
          (numOfFollowers === 1
            ? "1 follower"
            : followers.length + " followers")}
      </span>

      {!isSendingFollow && (
        <Button
          variant="contained"
          className={styles.btn}
          onClick={followHandler}
        >
          Follow
        </Button>
      )}
      {isSendingFollow && <LoadingSpinner size="small" />}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Person;
