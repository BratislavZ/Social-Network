import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { uiActions } from "../../../store/slices/ui-slice";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileImg from "../ProfileImg/ProfileImg";
import styles from "./CoverImg.module.css";

const CoverImg = () => {
  const userId = useAppSelector((state) => state.user._id);
  const profile = useAppSelector((state) => state.profile);
  const { _id, coverPicture } = profile;
  const dispatch = useAppDispatch();

  const openModalHandler = () => {
    dispatch(uiActions.showCoverImgModal(true));
  };

  const showImageHandler = () => {
    dispatch(
      uiActions.showImageModal({ isModalShown: true, image: coverPicture })
    );
  };

  return (
    <div className={styles.cover}>
      <img
        className={styles["cover-img"]}
        src={coverPicture}
        alt=""
        onClick={showImageHandler}
      />
      {_id === userId && (
        <CameraAltIcon
          fontSize="large"
          className={styles["camera-icon-cover"]}
          onClick={openModalHandler}
        />
      )}
      <ProfileImg />
    </div>
  );
};

export default CoverImg;
