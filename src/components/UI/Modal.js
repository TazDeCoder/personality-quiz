import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

function Modal(props) {
  const portalEl = document.getElementById("overlays");

  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
    </>
  );
}

export default Modal;
