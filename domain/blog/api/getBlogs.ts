import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { BlogPost, Locale } from "../../../types";
import { firestore } from "../../../services/firebase";

const getBlogs = async ({
  language = "en",
  tags = [],
}: {
  language: Locale;
  tags: string[];
}): Promise<BlogPost[]> => {
  const whereTags = tags.map((tag) => where("tags", "array-contains", tag));

  let docs = await getDocs(
    query(
      collection(firestore, `blog-posts-${language}`),
      ...whereTags,
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
