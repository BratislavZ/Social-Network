import { useState } from "react";

import { useAppDispatch } from "../../store/hooks/hooks";
import { uiActions } from "../../store/slices/ui-slice";
import useNavigation from "../../hooks/useNavigation";

import LogoutIcon from "@mui/icons-material/Logout";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import styles from "./Avatar.module.css";

type Props = {
  imgSrc: string;
};

const Avatar = (props: Props) => {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const {
    homePageHandler,
    profilePageHandler,
    jobsPageHandler,
    peoplePageHandler,
  } = useNavigation();

  const logoutHandler = () => {
    dispatch(uiActions.showLogoutModal(true));
    setShowOptions((prev) => !prev);
  };

  const deleteAccHandler = () => {
    dispatch(uiActions.showDeleteUserModal(true));
    setShowOptions((prev) => !prev);
  };

  const styleNavItem = `${styles.avatarOption} ${styles["nav-item"]}`;

  return (
    <span
      className={styles.avatar}
      tabIndex={-1}
      onBlur={() => setShowOptions(false)}
    >
      <img
        alt=""
        className={styles.image}
        src={props.imgSrc}
        onClick={() => setShowOptions((prev) => !prev)}
      />
      <div
        className={styles.avatarOptionsContainer}
        style={{ display: showOptions ? "flex" : "none" }}
      >
        <div className={styleNavItem} onClick={homePageHandler}>
          <HomeOutlinedIcon />
          Home
        </div>
        <div className={styleNavItem} onClick={profilePageHandler}>
          <AccountCircleOutlinedIcon />
          Profile
        </div>
        <div className={styleNavItem} onClick={peoplePageHandler}>
          <PeopleAltOutlinedIcon />
          People
        </div>
        <div className={styleNavItem} onClick={jobsPageHandler}>
          <WorkOutlineOutlinedIcon />
          Jobs
        </div>
        <div className={styles.avatarOption} onClick={logoutHandler}>
          <LogoutIcon />
          Logout
        </div>
        <div className={styles.avatarOption} onClick={deleteAccHandler}>
          <PersonRemoveOutlinedIcon />
          Delete account
        </div>
      </div>
    </span>
  );
};

export default Avatar;
