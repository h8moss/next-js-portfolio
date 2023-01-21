import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { BlogPost } from "../../../types";
import { firestore } from "../../../services/firebase";

const getBlogs = async ({
  language = "en",
}: {
  language: string;
}): Promise<BlogPost[]> => {
  let docs = await getDocs(
    query(
      collection(firestore, `blog-posts-${language}`),
      orderBy("created", "desc")
    )
  );
  return docs.docs.map((doc) => {
    let data = doc.data();
    return {
      id: doc.id,
      created: { seconds: data.created.seconds },
      tags: data.tags,
      body: data.body,
      title: data.title,
    };
  });
};

export default getBlogs;
