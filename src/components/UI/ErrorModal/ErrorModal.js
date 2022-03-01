import { createPortal } from "react-dom";

import styles from "./ErrorModal.module.css";
import Button from "../Button/Button";
import Card from "../Card/Card";

function Backdrop(props) {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
}

function ModalOverlay(props) {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>

      <div className={styles.content}>
        <p>{props.message}</p>
      </div>

      <footer className={styles.actions}>
        <Button onClick={props.onConfirm}>Ok</Button>
      </footer>
    </Card>
  );
}

function ErrorModal(props) {
  const portalEl = document.getElementById("overlays");

  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
      {createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        >
          {props.children}
        </ModalOverlay>,
        portalEl
      )}
    </>
  );
}

export default ErrorModal;
