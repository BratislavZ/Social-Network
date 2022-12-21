import useUserImgModal from "../../../hooks/useUserImgModal";

import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Modal from "../Modal";
import Image from "../../Share/Image/Image";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./UserImg.module.css";

type Props = {
  isCoverImg?: boolean;
  title: string;
};

const UserImg = ({ isCoverImg, title }: Props) => {
  const {
    inputRef,
    file,
    error,
    successMsg,
    isSending,
    closeHandler,
    removeImageHandler,
    selectImgHandler,
    submitHandler,
  } = useUserImgModal(isCoverImg);

  const styleMessage = error ? `${styles.error}` : `${styles.success}`;

  return (
    <Modal onClose={closeHandler}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.title}>{title}</div>
        {file && (
          <div className={styles["image-container"]}>
            <Image onClose={removeImageHandler} file={file} />
          </div>
        )}
        {!file && (
          <>
            <CloseIcon
              fontSize="large"
              className={styles["close-icon"]}
              onClick={closeHandler}
            />
            <div
              className={styles["add-image"]}
              onClick={() => inputRef.current?.click()}
            >
              Add image
              <AddPhotoAlternateOutlinedIcon fontSize="large" />
            </div>
          </>
        )}
        <input
          style={{ display: "none" }}
          type="file"
          ref={inputRef}
          accept=".png,.jpeg,.jpg"
          onChange={selectImgHandler}
        />
        <div className={styles.buttons}>
          {isSending && (
            <div className={styles.spinner}>
              <LoadingSpinner size="small" />
            </div>
          )}
          {!isSending && (
            <Button variant="contained" type="submit">
              Save
            </Button>
          )}
          <Button variant="outlined" type="button" onClick={closeHandler}>
            Cancel
          </Button>
        </div>
        {(error || successMsg) && (
          <span className={styleMessage}>{error || successMsg}</span>
        )}
      </form>
    </Modal>
  );
};

export default UserImg;
