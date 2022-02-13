import { FormikErrors } from "formik";

import { RequestBody } from "../types";
import validateEmail from "./validateEmail";

const validate = (values: RequestBody): Object => {
  let errors: any = {};

  if (!values.name) {
    errors.name = "This field is required!";
  } else if (values.name.length > 30) {
    errors.name = "Your name is too long!";
  }
  if (!values.message) {
    errors.message = "This field is required!";
  } else if (values.message.length > 300) {
    errors.message = "Your message is too long!";
  }
  if (values.email) {
    if (!validateEmail(values.email)) {
      errors.email = "Invalid email address!";
    }
  }

  return errors;
};

export default validate;
