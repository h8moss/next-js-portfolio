import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsEmojiNeutral } from "react-icons/bs";

import NavBar from "../../components/NavBar";
import { getBlogs } from "../../domain/blog/api";
import i18n from "../../domain/blog/i18n";
import { BlogListTile, Tag } from "../../domain/blog/index/index";
import styles from "../../domain/blog/index/style.module.css";
import useI18n from "../../hooks/useI18n";
import { dateFromSeconds } from "../../services/dateOperations";
import { BlogPost, Locale } from "../../types";

interface Props {
  posts: BlogPost[];
}

const Blogs = ({ posts }: Props) => {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute === router.pathname;
  const { noBlogText } = useI18n(i18n);

  const { indexTitle } = useI18n(i18n);

  const postComponents = posts.map((post) => {
    const dateCreated =
      post.created !== undefined ? dateFromSeconds(post.created.seconds) : null;

    let tagComponents = post.tags.map((tag) => <Tag text={tag} key={tag} />);

    return (
      <BlogListTile
        key={post.id}
        dateCreated={dateCreated}
        tags={tagComponents}
        title={post.title}
        onClick={() => setNextRoute(`blog/${post.id}`)}
      />
    );
  });

  return (
    <>
      <Head>
        <title>{indexTitle}</title>
      </Head>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <div className="h-screen p-8">
            <motion.div
              className={`bg-white text-black m-auto ${styles.cardDiv} shadow-lg rounded-md`}
              initial={{ height: "0px", padding: "0px", overflowY: "clip" }}
              exit={{ height: "0px", padding: "0px", overflowY: "clip" }}
              animate={{ height: "80%", padding: "16px", overflowY: "auto" }}
            >
              {postComponents == null || postComponents.length == 0 ? (
                <div className="justify-center text-center text-3xl flex flex-col">
                  {noBlogText}
                  <BsEmojiNeutral className="mx-auto mt-4" size={50} />
                </div>
              ) : (
                postComponents
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Blogs;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  query,
}) => {
  let tags: string[] = [];
  if (typeof query.tags === "string") tags = [query.tags];
  else tags = [...(query.tags || [])];

  const blogs = await getBlogs({
    language: locale as Locale,
    tags: tags,
  });
  return {
    props: {
      posts: blogs,
    },
  };
};
