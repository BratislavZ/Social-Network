import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { uiActions } from "../../store/slices/ui-slice";

import EditIcon from "@mui/icons-material/Edit";
import styles from "./UserInfo.module.css";

const UserInfo = () => {
  const userId = useAppSelector((state) => state.user._id);
  const profile = useAppSelector((state) => state.profile);
  const { _id, username, email, city, from, gender } = profile;
  const dispatch = useAppDispatch();
  const openModalHandler = () => {
    dispatch(
      uiActions.showEditUserInfoModal({
        isModalShown: true,
        username,
        city,
        from,
        gender,
      })
    );
  };

  return (
    <div className={styles.container}>
      {_id === userId && (
        <EditIcon
          fontSize="large"
          className={styles["edit-icon"]}
          onClick={openModalHandler}
        />
      )}
      <h4 className={styles.title}>User information</h4>
      <div className={styles.info}>
        <div className={styles["info-item"]}>
          <span className={styles.key}>Email:</span>
          <span className={styles.value}>{email}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles.key}>Username:</span>
          <span className={styles.value}>{username}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles.key}>City:</span>
          <span className={styles.value}>{city}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles.key}>From:</span>
          <span className={styles.value}>{from}</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles.key}>Gender:</span>
          <span className={styles.value}>{gender}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
