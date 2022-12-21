import { sendFollow, sendUnfollow } from "../../../store/api/user-api-actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CoverImg from "../CoverImg/CoverImg";
import styles from "./Top.module.css";

const Top = () => {
  const isSending = useAppSelector((state) => state.ui.followStatus.isFetching);
  const profile = useAppSelector((state) => state.profile);
  const { _id, username, isFollowed } = profile;
  const dispatch = useAppDispatch();

  const followHandler = () => {
    dispatch(sendFollow(_id));
  };

  const unfollowHandler = () => {
    dispatch(sendUnfollow(_id));
  };
  return (
    <div className={styles.container}>
      <CoverImg />
      <h2 className={styles.name}>{username}</h2>
      {isFollowed !== undefined && (
        <>
          {!isFollowed && !isSending && (
            <button className={styles["follow-btn"]} onClick={followHandler}>
              Follow
            </button>
          )}
          {isFollowed && !isSending && (
            <button
              className={styles["following-btn"]}
              onClick={unfollowHandler}
            >
              Following
            </button>
          )}
          {isSending && (
            <div className={styles.spinner}>
              <LoadingSpinner size="small" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Top;
