import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import BlogViewer from "../../components/BlogViewer";
import NavBar from "../../components/NavBar";
import ScrollToTop from "../../domain/about/ScrollToTop";
import { getBlog, getBlogs } from "../../domain/blog/api";
import { BlogPost, Locale } from "../../types";

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
