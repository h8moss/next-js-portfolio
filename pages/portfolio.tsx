import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import ImageLink from "../components/ImageLink";
import NavBar from "../components/NavBar";
import getProjects from "../domain/portfolio/api/getProjects";
import i18n from "../domain/portfolio/i18n";
import style from "../domain/portfolio/style.module.css";
import useI18n from "../hooks/useI18n";
import useLocale from "../hooks/useLocale";

const Portfolio = () => {
  const projects = getProjects();
  const locale = useLocale();

  const i = useI18n(i18n);

  const [projectIndex, setProjectIndex] = useState<number>(null);

  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute === router.pathname;

  return (
    <>
      <Head>
        <title>{i.title}</title>
        <meta name="description" content={i.description} />
      </Head>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <>
            <motion.div
              className={style.Card}
              initial={{ x: "100vw" }}
              animate={{ x: "0" }}
              exit={{ x: "-100vw" }}
            >
              {projects.map((v, i) => (
                <button
                  key={v.title.en}
                  className={style.ProjectListItem}
                  onClick={() => setProjectIndex(i)}
                >
                  <h2>{v.title[locale]}</h2>
                  <div className={style.TagList}>
                    {v.tags.map((v) => (
                      <div key={v}>{v}</div>
                    ))}
                  </div>
                </button>
              ))}
            </motion.div>
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
    </>
  );
};

export default Portfolio;
