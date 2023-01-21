import { addDoc, collection } from "firebase/firestore";

import { FormValues } from "../types";
import { firestore } from "../../../services/firebase";

const submit = async (values: FormValues): Promise<void> => {
  const contactCollection = collection(firestore, "/contact");

  await addDoc(contactCollection, values);
};

export default submit;
