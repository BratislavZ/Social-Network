import React, { useRef } from "react";

import { useAppSelector } from "../../../store/hooks/hooks";

import ImageIcon from "@mui/icons-material/Image";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import styles from "./Form.module.css";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = (props: Props) => {
  const isSendingPost = useAppSelector((state) => state.ui.share.isFetching);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      <div className={styles.options}>
        <div
          className={styles.option}
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon htmlColor="tomato" className={styles.icon} />
          <span>Photo</span>
          <input
            style={{ display: "none" }}
            type="file"
            ref={inputRef}
            accept=".png,.jpeg,.jpg"
            onChange={props.onSelectImage}
          />
        </div>
      </div>
      {!isSendingPost && <button className={styles.button}>Share</button>}
      {isSendingPost && (
        <div className={styles.spinner}>
          <LoadingSpinner size="small" />
        </div>
      )}
    </form>
  );
};

export default Form;
