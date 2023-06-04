import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import getAdminBlogs from "../../../domain/admin/blog/api/getAdminBlogs";
import BlogTile from "../../../domain/admin/blog/BlogTile/BlogTile";
import { AdminBlog } from "../../../domain/admin/blog/types";
import useAuth from "../../../services/firebase/hooks/useAuth";

const BlogAdminPage = () => {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
  const auth = useAuth({ required: true, loginPage: "/" });
  const router = useRouter();

  useEffect(() => {
    if (auth.user) {
      getAdminBlogs().then((b) => setBlogs(b));
    }
  }, [auth.user]);

  return (
    <div className="h-screen text-center flex flex-col justify-between p-2 overflow-y-hidden">
      <h1 className="p-8">Blog posts</h1>
      <div className="shadow-md bg-white text-black w-[50%] p-2 mx-auto text-left flex-1 overflow-y-auto">
        {blogs.map((v) => (
          <BlogTile
            post={v}
            key={v.id}
            onSuccess={(path) => {
              if (path && path !== router.pathname) {
                router.push(path);
              } else {
                router.reload();
              }
            }}
          />
        ))}
      </div>
      <div className="h-4" />
    </div>
  );
};

export default BlogAdminPage;
