import { FormikHelpers } from "formik";

import AuthService from "../../../services/firebase/auth";
import { SigninBody } from "../types";

const send = async (
  values: SigninBody,
  auth: AuthService,
  isRegistering: boolean,
  { resetForm, setSubmitting }: FormikHelpers<SigninBody>,
  onError: () => any
) => {
  console.log(isRegistering);

  if (isRegistering && values.password === values.password2) {
    try {
      await auth.createAccountWithMail(values.mail, values.password);
    } catch (e) {
      onError();
    }
  } else if (!isRegistering) {
    try {
      await auth.signInWithMail(values.mail, values.password);
    } catch (e) {
      onError();
    }
  }

  resetForm();
  setSubmitting(false);
};

export default send;
