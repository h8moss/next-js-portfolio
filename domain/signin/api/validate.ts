import validateEmail from "../../../services/validateEmail";
import { SigninBody } from "../types";
import { isLongEnough, testAll } from "./passwordValidator";

const validateSignIn = (values: SigninBody): Object => {
  let errors: any = {};

  if (!values.mail) {
    errors.mail = "This field is required";
  } else if (validateEmail(values.mail)) {
    errors.mail = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "This field is required";
  } else if (!isLongEnough(values.password)) {
    errors.password = "Password is not long enough";
  }
  return errors;
};

const validateRegister = (values: SigninBody): Object => {
  let errors: any = {};

  if (!values.mail) {
    errors.mail = "This field is required";
  } else if (validateEmail(values.mail)) {
    errors.mail = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "This field is required";
  } else if (!isLongEnough(values.password)) {
    errors.password = "Password must be at least 9 characters long";
  } else if (!testAll(values.password)) {
    errors.password =
      "Password must contain two of the following: a lower case letter, an upper case letter, a number, a rare character (@#!=)";
  }

  if (!values.password2) {
    errors.password2 = "This field is required";
  } else if (values.password !== values.password2) {
    errors.password2 = "The passwords don't match";
  }

  return errors;
};

const validate = (values: SigninBody): Object => {
  console.log({
    message: "validation",
    values: values,
  });

  if (values.isRegistering) {
    return validateRegister(values);
  }

  return validateSignIn(values);
};

export default validate;
