import { getDownloadURL, ref } from "firebase/storage";
import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import BlogViewer from "../../components/BlogViewer";
import NavBar from "../../components/NavBar";
import ScrollToTop from "../../domain/about/ScrollToTop";
import { getBlog } from "../../domain/blog/api";
import useLocale from "../../hooks/useLocale";
import { storage } from "../../services/firebase";
import { BlogPost } from "../../types";
import BlogBodyDiv from "../../components/BlogBodyDiv";

interface Props {
  post: BlogPost;
}

function Blog({ post }: Props) {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);
  const locale = useLocale();

  const shouldStay = nextRoute === router.pathname;

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <div>
        <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
          {shouldStay && (
            <>
              <BlogBodyDiv>
                <BlogViewer
                  post={post}
                  handleStorageImage={async (name) => {
                    return await getDownloadURL(
                      ref(storage, `blog-posts-${locale}/${post.id}/${name}`)
                    );
                  }}
                />
              </BlogBodyDiv>

              <ScrollToTop show={shouldStay} />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Blog;

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async ({ params, locale }) => {
  let id = params.id as string;

  const response = await getBlog({ id: id, language: locale });

  return {
    props: {
      post: response,
    },
  };
};
