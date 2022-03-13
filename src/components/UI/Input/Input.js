import styles from "./Input.module.css";

function Input(props) {
  return (
    <div className={`${styles.input} ${props?.className ?? ""}`.trim()}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        {...props.input}
      />
    </div>
  );
}

export default Input;
