import { useNavigate } from "react-router-dom";

import useLikesModal from "../../../hooks/useLikesModal";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { uiActions } from "../../../store/slices/ui-slice";

import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Modal from "../Modal";
import styles from "./Likes.module.css";

type User = {
  _id: string;
  username: string;
  profilePicture: string;
};

const Likes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isLoaded, peopleThatLiked, closeModalHandler } =
    useLikesModal();

  const selectPersonHandler = (personId: string) => {
    dispatch(uiActions.showLikesModal(false));
    navigate("/person/" + personId);
  };

  return (
    <Modal onClose={closeModalHandler}>
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.spinner}>
            <LoadingSpinner />
          </div>
        )}
        {isLoaded && (
          <div className={styles.main}>
            <div className={styles.header}>
              <CloseIcon
                className={styles.close}
                onClick={closeModalHandler}
                fontSize="large"
              />
              <ThumbUpIcon className={styles.like} />
              <div className={styles.number}>{peopleThatLiked.length}</div>
            </div>
            <div className={styles.people}>
              {peopleThatLiked.map((person: User) => (
                <div className={styles.person} key={person._id}>
                  <img
                    alt="person"
                    src={person.profilePicture}
                    className={styles.image}
                    onClick={() => selectPersonHandler(person._id)}
                  />
                  <div
                    className={styles.username}
                    onClick={() => selectPersonHandler(person._id)}
                  >
                    {person.username}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Likes;
