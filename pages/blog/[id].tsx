import { AnimatePresence, motion } from "framer-motion";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import BlogViewer from "../../components/BlogViewer";
import NavBar from "../../components/NavBar";
import { getBlog, getBlogs } from "../../domain/blog/api";
import { BlogPost } from "../../types";
import ScrollToTop from "../../domain/about/ScrollToTop";

interface Props {
  post: BlogPost;
}

function Blog({ post }: Props) {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

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
              <motion.div
                className="md:w-1/2 w-[95%] m-auto mt-10"
                initial={{
                  x: "100vw",
                }}
                animate={{
                  x: "0",
                }}
                exit={{
                  x: "-100vw",
                }}
              >
                <BlogViewer post={post} />
              </motion.div>

              <ScrollToTop show={shouldStay} />
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Blog;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  let id = params.id as string;

  const response = await getBlog({ id: id, language: locale });

  return {
    props: {
      post: response,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths = [];

  for (let locale of locales) {
    const posts = await getBlogs({ language: locale });
    const ids = posts.map((post) => post.id);
    paths = [
      ...paths,
      ...ids.map((id) => ({ params: { id: id }, locale: locale })),
    ];
  }

  return {
    fallback: false,
    paths,
  };
};
