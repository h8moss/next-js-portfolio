import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../../../services/firebase/firestore";

const getBlogs = async ({ language = "en" }: { language: string }) => {
  let docs = await getDocs(
    query(collection(db, `blog-posts-${language}`), orderBy("created", "desc"))
  );
  return docs.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

export default getBlogs;
