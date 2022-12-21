import useNavigation from "../../hooks/useNavigation";

import RssFeedIcon from "@mui/icons-material/RssFeed";
import PeopleIcon from "@mui/icons-material/People";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const { homePageHandler, peoplePageHandler, jobsPageHandler } =
    useNavigation();

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li onClick={homePageHandler}>
          <RssFeedIcon className={styles.icon} />
          <span>Feed</span>
        </li>
        <li onClick={peoplePageHandler}>
          <PeopleIcon className={styles.icon} />
          <span>People</span>
        </li>
        <li onClick={jobsPageHandler}>
          <WorkOutlineIcon className={styles.icon} />
          <span>Jobs</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
