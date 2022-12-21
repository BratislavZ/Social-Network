import React from "react";

import styles from "./PreLoginLayout.module.css";

type Props = {
  children: React.ReactNode;
};

const PreLoginLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.logo}>Social Network</h3>
        <span className={styles.desc}>
          Connect with people and find new jobs on Social Network.
        </span>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default PreLoginLayout;
