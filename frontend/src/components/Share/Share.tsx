import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks/hooks";
import useShare from "../../hooks/useShare";

import Form from "./Form/Form";
import Image from "./Image/Image";
import styles from "./Share.module.css";

const Share = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const {
    desc,
    file,
    removeImageHandler,
    imageChangeHandler,
    descChangeHandler,
    shareHandler,
    error,
  } = useShare();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <img
            className={styles["profile-image"]}
            src={user.profilePicture}
            alt="profile"
            onClick={() => navigate("/person/" + user._id)}
          />
          <input
            placeholder={`What's on your mind ${user.username}?`}
            value={desc}
            onChange={descChangeHandler}
          />
        </div>
        <hr className={styles.shareHr} />

        {/* if image is uploaded */}
        {file && (
          <div className={styles["image-container"]}>
            <Image file={file} onClose={removeImageHandler} />
          </div>
        )}

        <Form onSubmit={shareHandler} onSelectImage={imageChangeHandler} />
        <div className={styles.error}>{error}</div>
      </div>
    </div>
  );
};

export default Share;
