import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../services/firebase/firestore";

const getBlog = async ({
  id,
  language = "en",
}: {
  id: string;
  language: string;
}) => {
  let document = await getDoc(doc(db, `blog-posts-${language}/${id}`));
  if (!document.exists()) throw "Document not found!";
  return { ...document.data(), id: document.id };
};

export default getBlog;
