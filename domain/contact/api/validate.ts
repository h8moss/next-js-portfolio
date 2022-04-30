import validateEmail from "../../../services/validateEmail";
import { ValidationErrorTextBody } from "../i18n/types";
import { FormValues } from "../types";

const validate = (
  values: FormValues,
  errorText: ValidationErrorTextBody
): object => {
  let errors: {
    email?: string;
    name?: string;
    message?: string;
  } = {};

  if (values.email) {
    if (!validateEmail(values.email)) {
      errors.email = errorText.invalidMail;
    }
  }

  if (!values.message) {
    errors.message = errorText.missingMessage;
  } else if (values.message.length > 250) {
    errors.message = errorText.messageTooLong;
  }

  if (!values.name) {
    errors.name = errorText.missingName;
  }

  return errors;
};

export default validate;
