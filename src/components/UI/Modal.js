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
  return (
    <>
      <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
}

export default Modal;
