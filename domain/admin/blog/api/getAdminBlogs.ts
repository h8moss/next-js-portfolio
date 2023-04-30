import { Timestamp } from "@google-cloud/firestore";
import { collection, getDocs, query } from "firebase/firestore";

import { locales } from "../../../../constants";
import { firestore } from "../../../../services/firebase";
import { getBlogs } from "../../../blog/api";
import { AdminBlog } from "../types";

const getAdminBlogs = async (): Promise<AdminBlog[]> => {
  let blogs: AdminBlog[] = [];

  for (let locale of locales) {
    const publicBlogs = await getBlogs({ language: locale, tags: [] });

    const privateDocs = await getDocs(
      query(collection(firestore, `blog-posts-${locale}-private`))
    );

    const privateBlogs = privateDocs.docs.map<AdminBlog>((document) => {
      const data = document.data();

      return {
        id: document.id,

        title: data.title,
        tags: data.tags,
        body: data.body,

        created: { seconds: (data.created as Timestamp).seconds },

        isPrivate: true,
        locale,
      };
    });

    blogs = [
      ...blogs,
      ...publicBlogs.map<AdminBlog>((blog) => ({
        ...blog,
        locale,
        isPrivate: false,
      })),
      ...privateBlogs,
    ];
  }

  blogs.sort((a, b) => b.created.seconds - a.created.seconds);

  return blogs;
};

export default getAdminBlogs;
