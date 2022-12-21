import { PersonType } from "../../models/types";
import { useNavigate } from "react-router-dom";
import useFollowers from "../../hooks/useFollowers";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./UserFollowers.module.css";

const UserFollowers = () => {
  const navigate = useNavigate();
  const { followers, totalFollowers, error, isLoading, openModalHandler } =
    useFollowers();

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Followers</h4>
      {!isLoading && !error && (
        <>
          {totalFollowers > 6 && (
            <button className={styles["show-more"]} onClick={openModalHandler}>
              Show all
            </button>
          )}
          {totalFollowers === 0 && (
            <div className={styles["no-followers"]}>No followers.</div>
          )}
          <div className={styles.followers}>
            {followers.map((follower: PersonType) => (
              <div
                className={styles.item}
                key={follower._id}
                onClick={() => navigate("/person/" + follower._id)}
              >
                <img
                  src={follower.profilePicture}
                  alt=""
                  className={styles.img}
                />
                <span className={styles.name}>{follower.username}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {!isLoading && error && <div className={styles.error}>{error}</div>}
      {isLoading && (
        <div className={styles.spinner}>
          <LoadingSpinner size="small" />
        </div>
      )}
    </div>
  );
};

export default UserFollowers;
