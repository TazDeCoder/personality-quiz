import { useState, useContext, useEffect, useCallback } from "react";

import styles from "./Signup.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
// CONTEXTS
import UserContext from "../../store/user-context";
// CUSTOM HOOKS
import useInput from "../../hooks/use-input";

import { API_URL } from "../../config";

function Signup(props) {
  let formIsValid = false;

  ////////////////////////////////////////////////
  ////// Helper functions
  ///////////////////////////////////////////////

  const validateUsername = (username) => username.trim().length !== 0;
  const validatePassword = (password) => password.trim().length !== 0;

  ////////////////////////////////////////////////
  ////// Declaring states and context
  ////// (+ conditonal classes and variables)
  ///////////////////////////////////////////////

  const userCtx = useContext(UserContext);

  const [usersListing, setUsersListing] = useState([]);

  // USERNAME STATE + HANDLERS
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasErrors: enteredUsernameHasErrors,
    inputChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(validateUsername);
  // USERNAME CLASSES
  const usernameInputClasses = enteredUsernameHasErrors ? styles.invalid : "";

  // PASSWORD STATE + HANDLERS
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasErrors: enteredPasswordHasErrors,
    inputChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);
  // PASSWORD CLASSES
  const passwordInputClasses = enteredPasswordHasErrors ? styles.invalid : "";

  // Checking if all inputs provided are valid
  if (enteredUsernameIsValid && enteredPasswordIsValid) formIsValid = true;

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  // HTTP REQUEST HANDLERS

  const fetchUsersListing = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users`);

      if (!response.ok) {
        const err = new Error("Failed to fetch users");
        err.status = response.status;
        throw err;
      }

      const { usersList } = await response.json();
      setUsersListing(usersList);
    } catch (err) {
      // Handle error
      props.onError({
        title: `Something went wrong! (${err.status})`,
        message: err.message,
      });
      // Close modal window
      props.onClose();
    }
  }, []);

  useEffect(() => {
    fetchUsersListing();
  }, [fetchUsersListing]);

  // DATA PROCESSING HANDLERS

  const submitHandler = async (e) => {
    e.preventDefault();
    // Checking if username already exists
    const existingUsernameIdx = usersListing.findIndex(
      (user) => user.username === enteredUsername
    );
    if (existingUsernameIdx !== -1) {
      props.onError({
        title: "Username invalid",
        message: "Username must be unique. Try again",
      });
      return;
    }
    // Create user data object
    const userData = {
      username: enteredUsername,
      password: enteredPassword,
    };
    // Handle user data
    await props.onSignup(userData);
    // Login user if SUCCESS
    userCtx.onLogin(userData).catch((err) => {
      props.onError({
        title: `Login failed! (${err.status})`,
        message: err.message,
      });
    });
    // Close modal window
    props.onClose();
  };

  return (
    <div className={styles.signup}>
      <h1>Sign up</h1>
      <form onSubmit={submitHandler}>
        <div className={styles["signup__controls"]}>
          <Input
            id={"username"}
            className={usernameInputClasses}
            label={"Username"}
            type={"text"}
            value={enteredUsername}
            onChange={usernameChangedHandler}
            input={{
              placeholder: "Enter a unique username",
              required: true,
              onBlur: usernameBlurHandler,
            }}
          />

          <Input
            id={"password"}
            className={passwordInputClasses}
            label={"Password"}
            type={"text"}
            value={enteredPassword}
            onChange={passwordChangedHandler}
            input={{
              placeholder: "Enter a strong password",
              required: true,
              onBlur: passwordBlurHandler,
            }}
          />

          <div className={styles["signup__actions"]}>
            <Button type="submit" disabled={!formIsValid}>
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
