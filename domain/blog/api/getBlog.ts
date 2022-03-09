import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../services/firebase/firestore";
import { BlogPost } from "../../../types";

const getBlog = async ({
  id,
  language = "en",
}: {
  id: string;
  language: string;
}): Promise<BlogPost> => {
  let document = await getDoc(doc(db, `blog-posts-${language}/${id}`));
  if (!document.exists()) throw "Document not found!";
  let data = document.data();
  return {
    id: document.id,
    created: { seconds: data.created.seconds },
    tags: data.tags,
    text: data.text,
    title: data.title,
  };
};

export default getBlog;
