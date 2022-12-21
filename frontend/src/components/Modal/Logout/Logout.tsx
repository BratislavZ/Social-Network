import { useAppDispatch } from "../../../store/hooks/hooks";
import { uiActions } from "../../../store/slices/ui-slice";
import { authActions } from "../../../store/slices/auth-slice";
import { eraseCookie } from "../../../helpers/Cookie";
import { feedActions } from "../../../store/slices/feed-slice";
import { profileActions } from "../../../store/slices/profile-slice";

import Modal from "../Modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import styles from "./Logout.module.css";

const Logout = () => {
  const dispatch = useAppDispatch();
  const closeHandler = () => {
    dispatch(uiActions.showLogoutModal(false));
  };

  const logoutHandler = () => {
    eraseCookie("jwt");
    eraseCookie("userLogged");
    dispatch(authActions.logout());
    dispatch(uiActions.showLogoutModal(false));

    // clean any error or success messages
    dispatch(uiActions.isDeletingPost({ isFetching: false }));
    dispatch(uiActions.isDeletingUser({ isFetching: false }));
    dispatch(uiActions.isLoadingFeed({ isFetching: false }));
    dispatch(uiActions.isLoadingFollows({ isFetching: false }));
    dispatch(uiActions.isLoadingLikes({ isFetching: false }));
    dispatch(uiActions.isLoadingPeople({ isFetching: false }));
    dispatch(uiActions.isLoadingProfile({ isFetching: false }));
    dispatch(uiActions.isSendingFollowStatus({ isFetching: false }));
    dispatch(uiActions.isSendingPost({ isFetching: false }));
    dispatch(uiActions.isUpdatingUserImg({ isFetching: false }));
    dispatch(uiActions.isUpdatingUserInfo({ isFetching: false }));
    dispatch(feedActions.cleanFeed());
    dispatch(profileActions.cleanProfile());
  };

  return (
    <Modal onClose={closeHandler}>
      <div className={styles.container}>
        <CloseIcon
          fontSize="large"
          className={styles["close-icon"]}
          onClick={closeHandler}
        />
        <div className={styles.question}>
          Are you sure that you want logout?
        </div>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            className={styles["confirm-btn"]}
            onClick={logoutHandler}
          >
            Yes
          </Button>

          <Button
            variant="outlined"
            className={styles["cancel-btn"]}
            onClick={closeHandler}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
