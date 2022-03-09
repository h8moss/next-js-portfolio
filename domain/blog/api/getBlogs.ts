import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../../../services/firebase/firestore";
import { BlogPost } from "../../../types";

const getBlogs = async ({
  language = "en",
}: {
  language: string;
}): Promise<BlogPost[]> => {
  let docs = await getDocs(
    query(collection(db, `blog-posts-${language}`), orderBy("created", "desc"))
  );
  return docs.docs.map((doc) => {
    let data = doc.data();
    return {
      id: doc.id,
      created: { seconds: data.created.seconds },
      tags: data.tags,
      text: data.text,
      title: data.title,
    };
  });
};

export default getBlogs;
