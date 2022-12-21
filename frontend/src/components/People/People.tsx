import usePeople from "../../hooks/usePeople";

import Person from "./Person/Person";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./People.module.css";

const People = () => {
  const { people, isFetchingPeople } = usePeople();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>People you may know</div>
        {!isFetchingPeople && (
          <>
            <div className={styles.main}>
              {people.map((p) => (
                <Person
                  key={p._id}
                  _id={p._id}
                  followers={p.followers}
                  profilePicture={p.profilePicture}
                  username={p.username}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {isFetchingPeople && (
        <div className={styles.spinner}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default People;
