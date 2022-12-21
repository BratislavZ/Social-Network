import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { deleteUser } from "../../../store/api/user-api-actions";
import { uiActions } from "../../../store/slices/ui-slice";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Modal from "../Modal";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./DeleteUser.module.css";

const DeleteUser = () => {
  const isDeleting = useAppSelector((state) => state.ui.deleteUser.isFetching);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(uiActions.showDeleteUserModal(false));
  };

  const deleteUserHandler = () => {
    dispatch(deleteUser());
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
          Are you sure that you want delete your account?
        </div>
        <div className={styles.buttons}>
          {!isDeleting && (
            <Button
              variant="contained"
              className={styles["confirm-btn"]}
              onClick={deleteUserHandler}
            >
              Yes
            </Button>
          )}
          {isDeleting && <LoadingSpinner size="small" />}

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

export default DeleteUser;
