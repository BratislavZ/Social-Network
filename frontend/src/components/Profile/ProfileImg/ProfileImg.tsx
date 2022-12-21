import React from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { uiActions } from "../../../store/slices/ui-slice";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import styles from "./ProfileImg.module.css";

const ProfileImg = () => {
  const userId = useAppSelector((state) => state.user._id);
  const profile = useAppSelector((state) => state.profile);
  const { _id, profilePicture } = profile;
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(uiActions.showProfileImgModal(true));
  };

  const showImageHandler = () => {
    dispatch(
      uiActions.showImageModal({ isModalShown: true, image: profilePicture })
    );
  };

  return (
    <div className={styles["profile-image-container"]}>
      <img
        className={styles["user-img"]}
        src={profilePicture}
        alt=""
        onClick={showImageHandler}
      />
      {_id === userId && (
        <CameraAltIcon
          fontSize="large"
          className={styles["camera-icon-profile"]}
          onClick={openModalHandler}
        />
      )}
    </div>
  );
};

export default ProfileImg;
