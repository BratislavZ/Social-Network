import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { uiActions } from "../../../store/slices/ui-slice";

import Modal from "../Modal";
import styles from "./Image.module.css";

const Image = () => {
  const image = useAppSelector((state) => state.ui.modalImage.image);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(uiActions.showImageModal({ isModalShown: false }));
  };

  return (
    <Modal onClose={closeHandler} isImage={true}>
      <img alt="" src={image} className={styles.image} />
    </Modal>
  );
};

export default Image;
