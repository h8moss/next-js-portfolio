import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import ImageLink from "../components/ImageLink";
import NavBar from "../components/NavBar";
import getProjects from "../domain/portfolio/api/getProjects";
import i18n from "../domain/portfolio/i18n";
import style from "../domain/portfolio/style.module.css";
import Tag from "../domain/portfolio/Tag";
import useI18n from "../hooks/useI18n";
import useLocale from "../hooks/useLocale";
import { BsEmojiNeutral } from "react-icons/bs";

const Portfolio = () => {
  const projects = getProjects();
  const locale = useLocale();

  const i = useI18n(i18n);

  const [projectIndex, setProjectIndex] = useState<number>(null);

  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const [search, setSearch] = useState("");

  const shouldStay = nextRoute === router.pathname;

  const filteredProjects = useMemo(() => {
    if (search.trim().length === 0) return [...projects];
    const splitSearch = search.trim().split(" ");
    return projects.filter((project) => {
      return splitSearch.every((term) =>
        project.tags.some((tag) =>
          tag.toLowerCase().includes(term.toLowerCase())
        )
      );
    });
  }, [projects, search]);

  return (
    <>
      <Head>
        <title>{i.title}</title>
        <meta name="description" content={i.description} />
      </Head>
      <div className="w-screen h-screen flex flex-col">
        <NavBar onClick={(route) => setNextRoute(route)} />
        <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
          {shouldStay && (
            <>
              <div className="grow justify-center flex flex-col">
                <motion.input
                  className={style.SearchBar}
                  placeholder="search tags"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  initial={{ x: "100vw" }}
                  animate={{ x: "0" }}
                  exit={{ x: "-100vw" }}
                />
                <motion.div
                  className={style.Card}
                  initial={{ x: "100vw" }}
                  animate={{ x: "0" }}
                  exit={{ x: "-100vw" }}
                >
                  {filteredProjects.map((v, i) => (
                    <motion.button
                      key={v.title.en}
                      className={style.ProjectListItem}
                      onClick={() => setProjectIndex(i)}
                      animate={{ scale: 1, scaleY: 1 }}
                      whileHover={{ scale: 1.025 }}
                    >
                      <h2>{v.title[locale]}</h2>
                      <div className={style.TagList}>
                        {v.tags.map((v) => (
                          <Tag key={v} tag={v} />
                        ))}
                      </div>
                    </motion.button>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="flex flex-col justify-center p-2 text-center">
                      <h2>Sorry, no projects match your search</h2>
                      <BsEmojiNeutral className="mx-auto" />
                    </div>
                  )}
                </motion.div>
              </div>
              <AnimatePresence>
                {projectIndex != null && shouldStay && (
                  <motion.div
                    className={style.ModalBackground}
                    onClick={() => setProjectIndex(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className={style.ModalCard}
                      onClick={(e) => e.stopPropagation()}
                      initial={{ y: "-100vh" }}
                      animate={{ y: "0" }}
                      exit={{ y: "150vh" }}
                    >
                      <h1>{projects[projectIndex].title[locale]}</h1>
                      <div className={style.ProjectDescription}>
                        {projects[projectIndex].description[locale]}
                        <div>
                          {projects[projectIndex].links &&
                            projects[projectIndex].links.map((v) => (
                              <ImageLink
                                alt={v.alt}
                                href={v.url}
                                src={v.imageSource}
                                key={v.url}
                              />
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Portfolio;
