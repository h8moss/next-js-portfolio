import { getBytes, getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import BlogViewer from "../../../../components/BlogViewer";
import DarkModeSwitch from "../../../../components/NavBar/NavigationButtons/DarkModeSwitch/DarkModeSwitch";
import ScrollToTop from "../../../../domain/about/ScrollToTop";
import getAdminBlog from "../../../../domain/admin/blog/api/getAdminBlog";
import { AdminBlog } from "../../../../domain/admin/blog/types";
import useLocale from "../../../../hooks/useLocale";
import useTheme from "../../../../hooks/useTheme";
import { storage } from "../../../../services/firebase";
import useAuth from "../../../../services/firebase/hooks/useAuth";
import BlogBodyDiv from "../../../../components/BlogBodyDiv";

const AdminBlogPage = () => {
  const router = useRouter();
  const { privacy, id } = router.query;
  const locale = useLocale();

  const [post, setPost] = useState<AdminBlog | null>(null);
  const [error, setError] = useState<string>("");

  const isPrivate = useMemo(() => privacy === "private", [privacy]);

  const getPost = useCallback(async () => {
    setError("");
    try {
      const p = await getAdminBlog({
        id: id as string,
        isPrivate,
        locale,
      });

      setPost(p);
    } catch (e) {
      setError(e);
    }
  }, [id, isPrivate, locale]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const _ = useAuth({ required: true, loginPage: "/" });

  const theme = useTheme();

  return (
    <>
      <nav
        className={
          "flex flex-row justify-around shadow-2xl top-0 sticky w-full z-[99] " +
          theme.highlightBgColorClass
        }
      >
        <Link href={"/admin"}>ADMIN-HOME</Link>
        <Link href={"/admin/blog"}>ADMIN-BLOG</Link>
        <DarkModeSwitch />
      </nav>
      {error ? (
        <>
          <p>Something went wrong:</p>
          <p>{error}</p>
        </>
      ) : (
        <div>
          {!!post ? (
            <>
              <BlogBodyDiv>
                <BlogViewer
                  post={post}
                  storageToUrl={async (name) => {
                    return await getDownloadURL(
                      ref(storage, `blog-posts-${locale}/${post.id}/${name}`)
                    );
                  }}
                  storageToBytes={async (id) => {
                    return await getBytes(
                      ref(storage, `blog-posts-${locale}/${post.id}/${id}`)
                    );
                  }}
                />
              </BlogBodyDiv>
              <ScrollToTop show />
            </>
          ) : (
            <p>loading...</p>
          )}
        </div>
      )}
    </>
  );
};

export default AdminBlogPage;
