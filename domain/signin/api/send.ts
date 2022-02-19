import { FormikHelpers } from "formik";

import AuthService from "../../../services/firebase/auth";
import { SigninBody } from "../types";

const send = async (
  values: SigninBody,
  auth: AuthService,
  { resetForm, setSubmitting }: FormikHelpers<SigninBody>
) => {
  if (values.isRegistering && values.password === values.password2) {
    try {
      await auth.createAccountWithMail(values.mail, values.password);
    } catch (e) {}
  } else if (!values.isRegistering) {
    await auth.signInWithMail(values.mail, values.password);
  }

  resetForm();
  setSubmitting(false);
};

export default send;
