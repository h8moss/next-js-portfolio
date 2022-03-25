import { addDoc, collection } from "firebase/firestore";
import { FormikHelpers } from "formik";

import { db } from "../../../services/firebase/firestore";
import { RequestBody } from "../types";

const send = async (
  values: RequestBody,
  { resetForm, setFieldError, setSubmitting }: FormikHelpers<RequestBody>,
  onSuccess: () => any,
  onFailure: () => any
): Promise<void> => {
  if (!values.name || !values.message) {
    setFieldError("general", "Something went wrong");
    setSubmitting(false);
    onFailure();
  } else {
    const contactCollection = collection(db, "/contact");
    await addDoc(contactCollection, {
      name: values.name,
      message: values.message,
      email: values.email ? values.email : null,
    });

    resetForm();
    onSuccess();
  }
};

export default send;
