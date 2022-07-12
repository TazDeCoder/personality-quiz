import { useState, useContext, useEffect, useCallback } from "react";
import { equals, escape } from "validator/lib";

import styles from "./Signup.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
// CONTEXTS
import UserContext from "../../store/user-context";
// CUSTOM HOOKS
import useInput from "../../hooks/use-input";

import { API_URL } from "../../config";
import { validator } from "../../lib";

function Signup(props) {
  let formIsValid = false;

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
  } = useInput(validator("username"));
  // USERNAME CLASSES
  const usernameInputClasses = enteredUsernameHasErrors ? styles.invalid : "";

  // PASSWORD STATE + HANDLERS
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasErrors: enteredPasswordHasErrors,
    inputChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validator("password"));
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
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  }, [props]);

  useEffect(() => {
    fetchUsersListing();
  }, [fetchUsersListing]);

  // DATA PROCESSING HANDLERS

  const submitHandler = async (e) => {
    e.preventDefault();
    // Checking if username already exists
    const existingUsernameIdx = usersListing.findIndex((user) =>
      equals(user.username, enteredUsername)
    );
    if (existingUsernameIdx !== -1) {
      props.onError({
        title: "Username invalid",
        message: "Username must be unique. Try again",
      });
      return;
    }
    // Sanitize input fields
    const sanitizedEnteredUsername = escape(enteredUsername);
    const sanitizedEnteredPassword = escape(enteredPassword);
    // Create user data object
    const userData = {
      username: sanitizedEnteredUsername,
      password: sanitizedEnteredPassword,
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
              minLength: 6,
              maxLength: 32,
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
              minLength: 6,
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
