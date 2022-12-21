import useDeletePostModal from "../../../hooks/useDeletePostModal";

import Modal from "../Modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./DeletePost.module.css";

const DeletePost = () => {
  const { isDeleting, error, closeHandler, deleteHandler } =
    useDeletePostModal();

  return (
    <Modal onClose={closeHandler}>
      <div className={styles.container}>
        <CloseIcon
          fontSize="large"
          className={styles["close-icon"]}
          onClick={closeHandler}
        />
        <div className={styles.question}>
          Are you sure that you want to delete this post?
        </div>
        <div className={styles.buttons}>
          {isDeleting && <LoadingSpinner size="small" />}
          {!isDeleting && (
            <Button
              variant="contained"
              className={styles["delete-btn"]}
              onClick={deleteHandler}
            >
              Yes
            </Button>
          )}
          <Button
            variant="outlined"
            className={styles["cancel-btn"]}
            onClick={closeHandler}
          >
            No
          </Button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </Modal>
  );
};

export default DeletePost;
