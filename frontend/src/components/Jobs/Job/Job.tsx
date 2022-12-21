import React from "react";

import { JobInterface } from "../../../models/interfaces";

import PaymentsIcon from "@mui/icons-material/Payments";
import Button from "@mui/material/Button";
import styles from "./Job.module.css";

type Props = {
  data: JobInterface;
};

const Job = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    company,
    created,
    location,
    redirect_url,
    minSalary,
    maxSalary,
    title,
  } = props.data;

  return (
    <div className={styles.card} ref={ref}>
      <div className={styles.top}>
        <div className={styles.title} onClick={() => window.open(redirect_url)}>
          {title}
        </div>
        <div className={styles["company-name"]}>{company}</div>
        <div className={styles.location}>{location.display_name}</div>
        <div className={styles.salary}>
          <PaymentsIcon />£{minSalary} - £{maxSalary}
        </div>
      </div>
      <div className={styles.date}>{created}</div>
      <div className={styles.btn}>
        <Button variant="contained" onClick={() => window.open(redirect_url)}>
          Find more
        </Button>
      </div>
    </div>
  );
});

export default Job;
