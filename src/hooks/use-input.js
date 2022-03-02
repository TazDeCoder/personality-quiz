import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

function inputStateReducer(state, action) {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === "RESET") {
    return initialInputState;
  }

  return initialInputState;
}

function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasErrors = inputState.isTouched && !valueIsValid;

  const inputChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const inputResetHandler = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasErrors,
    inputChangeHandler,
    inputBlurHandler,
    inputResetHandler,
  };
}

export default useInput;
