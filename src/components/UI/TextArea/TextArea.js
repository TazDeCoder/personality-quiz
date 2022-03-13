import styles from "./TextArea.module.css";

function TextArea(props) {
  return (
    <div className={`${styles.textarea} ${props?.className ?? ""}`.trim()}>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        {...props.textarea}
      />
    </div>
  );
}

export default TextArea;
