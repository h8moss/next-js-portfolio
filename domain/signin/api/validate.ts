import validateEmail from "../../../services/validateEmail";
import { ErrorMessages } from "../i18n/types";
import { SigninBody } from "../types";
import { isLongEnough, testAll } from "./passwordValidator";

const validateSignIn = (
  values: SigninBody,
  errorMessages: ErrorMessages
): Object => {
  let errors: any = {};

  const { invalidEmail, passwordLength, required } = errorMessages;

  if (!values.mail) {
    errors.mail = required;
  } else if (!validateEmail(values.mail)) {
    errors.mail = invalidEmail;
  }

  if (!values.password) {
    errors.password = required;
  } else if (!isLongEnough(values.password)) {
    errors.password = passwordLength;
  }
  return errors;
};

const validateRegister = (
  values: SigninBody,
  errorMessages: ErrorMessages
): Object => {
  let errors: any = {};

  const {
    invalidEmail,
    passwordLengthMin,
    passwordMatch,
    passwordMustContain,
    required,
  } = errorMessages;

  if (!values.mail) {
    errors.mail = required;
  } else if (!validateEmail(values.mail)) {
    errors.mail = invalidEmail;
  }

  if (!values.password) {
    errors.password = required;
  } else if (!isLongEnough(values.password)) {
    errors.password = passwordLengthMin;
  } else if (!testAll(values.password)) {
    errors.password = passwordMustContain;
  }

  if (!values.password2) {
    errors.password2 = required;
  } else if (values.password !== values.password2) {
    errors.password2 = passwordMatch;
  }

  return errors;
};

const validate = (
  values: SigninBody,
  isRegistering: boolean,
  errorMessages: ErrorMessages
): Object => {
  if (isRegistering) {
    return validateRegister(values, errorMessages);
  }

  return validateSignIn(values, errorMessages);
};

export default validate;
