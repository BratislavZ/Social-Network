import CloseIcon from "@mui/icons-material/Close";
import styles from "./Image.module.css";

type Props = {
  onClose: () => void;
  file: File;
};

const Image = (props: Props) => {
  return (
    <div className={styles["img-container"]}>
      <CloseIcon
        fontSize="large"
        className={styles.cancel}
        onClick={props.onClose}
      />
      <img
        className={styles.img}
        src={URL.createObjectURL(props.file)}
        alt=""
      />
    </div>
  );
};

export default Image;
