import { isEmpty, isLength, isAlphanumeric } from "validator/lib";

const validators = Object.freeze({
  quizTitle: validateQuizTitle,
  quizDesc: validateQuizDesc,
  username: validateUsername,
  password: validatePassword,
});

export function validateQuizTitle(quizTitle) {
  return !isEmpty(quizTitle) && isLength(quizTitle, { max: 200 });
}

export function validateQuizDesc(quizDesc) {
  !isEmpty(quizDesc) && isLength(quizDesc, { max: 400 });
}

export function validateUsername(username) {
  return (
    !isEmpty(username) &&
    isLength(username, { min: 6, max: 32 }) &&
    isAlphanumeric(username, "en-GB", { ignore: "-_" })
  );
}

export function validatePassword(password) {
  return (
    !isEmpty(password) &&
    isLength(password, { min: 6 }) &&
    isAlphanumeric(password, "en-GB")
  );
}

export default function validator(key) {
  const validate = validators[key];
  return validate;
}
