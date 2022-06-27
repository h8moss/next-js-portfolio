import { addDoc, collection } from "firebase/firestore";

import { db } from "../../../services/firebase/firestore";
import { FormValues } from "../types";

const submit = async (values: FormValues): Promise<void> => {
  const contactCollection = collection(db, "/contact");

  await addDoc(contactCollection, values);
};

export default submit;
