import { JobInterface } from "../../models/interfaces";
import generateID from "../../helpers/generateID";
import useJobs from "../../hooks/useJobs";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Job from "./Job/Job";
import styles from "./Jobs.module.css";

const Jobs = () => {
  const { jobs, loading, error, lastCardRef } = useJobs();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {!error && (
          <>
            <div className={styles.title}>Available jobs</div>
            <div className={styles.main}>
              {jobs.map((job: JobInterface, index: number) => {
                const key = generateID(12);
                if (jobs.length === index + 1) {
                  return (
                    <Job key={job.id + key} ref={lastCardRef} data={job} />
                  );
                } else {
                  return <Job key={job.id + key} data={job} />;
                }
              })}
            </div>
          </>
        )}
      </div>
      {loading && (
        <div className={styles.spinner}>
          <LoadingSpinner />
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Jobs;
