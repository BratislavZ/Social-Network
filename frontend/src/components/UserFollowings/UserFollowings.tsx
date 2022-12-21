import { useNavigate } from "react-router-dom";

import { PersonType } from "../../models/types";
import useFollowings from "../../hooks/useFollowings";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./UserFollowings.module.css";

const UserFollowings = () => {
  const navigate = useNavigate();
  const { followings, totalFollowings, error, isLoading, openModalHandler } =
    useFollowings();

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Following</h4>
      {!isLoading && !error && (
        <>
          {totalFollowings > 6 && (
            <button className={styles["show-more"]} onClick={openModalHandler}>
              Show all
            </button>
          )}
          {totalFollowings === 0 && (
            <div className={styles["no-followings"]}>No followees.</div>
          )}
          <div className={styles.followings}>
            {followings.map((following: PersonType) => (
              <div
                className={styles.item}
                key={following._id}
                onClick={() => navigate("/person/" + following._id)}
              >
                <img
                  src={following.profilePicture}
                  alt=""
                  className={styles.img}
                />
                <span className={styles.name}>{following.username}</span>
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

export default UserFollowings;
