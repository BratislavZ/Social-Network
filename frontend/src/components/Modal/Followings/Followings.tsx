import { PersonType } from "../../../models/types";
import useFollowsModal from "../../../hooks/useFollowsModal";

import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import Modal from "../Modal";
import Following from "./Following/Following";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./Followings.module.css";

const Followings = () => {
  const {
    people: followings,
    totalNumPeople: totalFollowings,
    error,
    loading,
    lastCardRef,
    closeModalHandler,
  } = useFollowsModal({ isFollower: false });

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
                <div className={styles.number}>{totalFollowings}</div>
              </div>
              <div className={styles.followings}>
                {followings.map((following: PersonType, index: number) => {
                  if (followings.length === index + 1) {
                    return (
                      <Following
                        key={following._id}
                        ref={lastCardRef}
                        data={following}
                      />
                    );
                  } else {
                    return <Following key={following._id} data={following} />;
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

export default Followings;
