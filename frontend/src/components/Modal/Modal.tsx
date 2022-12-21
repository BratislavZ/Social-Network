import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

interface ModalOverlayProps {
  children: React.ReactNode;
  isImage?: boolean;
}

interface ModalProps {
  onClose: () => void;
  isImage?: boolean;
  children: React.ReactNode;
}

const Backdrop = (props: BackdropProps) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: ModalOverlayProps) => {
  const styleModal = props.isImage
    ? `${styles.modal} ${styles.image}`
    : `${styles.modal}`;

  return (
    <div className={styleModal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.querySelector("#overlays") as HTMLElement;

const Modal = (props: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay isImage={props.isImage}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
