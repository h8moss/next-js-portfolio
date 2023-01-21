import { doc, getDoc } from "firebase/firestore";

import { BlogPost } from "../../../types";
import { firestore } from "../../../services/firebase";

async function getBlog({
  id,
  language = "en",
}: {
  id: string;
  language: string;
}): Promise<BlogPost> {
  let document = await getDoc(doc(firestore, `blog-posts-${language}/${id}`));
  if (!document.exists()) throw "Document not found!";
  let data = document.data();
  return {
    id: document.id,
    created: { seconds: data.created.seconds },
    tags: data.tags,
    body: data.body,
    title: data.title,
  };
}

export default getBlog;
