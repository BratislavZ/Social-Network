import { PersonType } from "../../../models/types";
import useFollowsModal from "../../../hooks/useFollowsModal";

import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Modal from "../Modal";
import Follower from "./Follower/Follower";
import styles from "./Followers.module.css";

const Followers = () => {
  const {
    totalNumPeople: totalFollowers,
    people: followers,
    lastCardRef,
    error,
    loading,
    closeModalHandler,
  } = useFollowsModal({ isFollower: true });

  return (
    <Modal onClose={closeModalHandler}>
      <div className={styles.container}>
        {!error && (
          <>
            <div className={styles.main}>
              <div className={styles.header}>
                <CloseIcon
                  className={styles["close-icon"]}
                  onClick={closeModalHandler}
                  fontSize="large"
                />
                <PeopleIcon className={styles["people-icon"]} />
                <div className={styles.number}>{totalFollowers}</div>
              </div>
              <div className={styles.followers}>
                {followers.map((follower: PersonType, index: number) => {
                  if (followers.length === index + 1) {
                    return (
                      <Follower
                        key={follower._id}
                        ref={lastCardRef}
                        data={follower}
                      />
                    );
                  } else {
                    return <Follower key={follower._id} data={follower} />;
                  }
                })}
                {loading && (
                  <div className={styles.spinner}>
                    <LoadingSpinner size="small" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </Modal>
  );
};

export default Followers;
