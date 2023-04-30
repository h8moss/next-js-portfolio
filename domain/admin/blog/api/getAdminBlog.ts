import { doc, getDoc } from "firebase/firestore";

import { firestore } from "../../../../services/firebase";
import { Locale } from "../../../../types";
import { AdminBlog } from "../types";

interface Params {
  id: string;
  isPrivate: boolean;
  locale: Locale;
}

const getAdminBlog = async ({
  id,
  isPrivate,
  locale,
}: Params): Promise<AdminBlog> => {
  const privateString = isPrivate ? "-private" : "";

  const document = doc(
    firestore,
    `/blog-posts-${locale}${privateString}/${id}`
  );

  const snapshot = await getDoc(document);
  if (!snapshot.exists()) throw "Document does not exist";

  const data = snapshot.data()!;
  const { body, created, tags, title } = data;

  return {
    body,
    created,
    id,
    isPrivate,
    tags,
    title,
    locale,
  };
};

export default getAdminBlog;
