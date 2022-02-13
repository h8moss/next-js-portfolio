import { FormikHelpers } from "formik";

import { server } from "../../../config";
import { RequestBody } from "../types";

const send = async (
  values: RequestBody,
  { resetForm, setFieldError, setSubmitting }: FormikHelpers<RequestBody>,
  onSuccess: () => any,
  onFailure: () => any
): Promise<void> => {
  const name = values.name;
  const message = values.message;
  const email = values.email ? values.email : null;

  const res = await fetch(`${server}/api/contact`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      message: message,
      email: email,
    }),
  });

  if (res.status !== 200) {
    setFieldError("general", "Something went wrong!");
    setSubmitting(false);
    onFailure();
  } else {
    resetForm();
    onSuccess();
  }
};

export default send;
