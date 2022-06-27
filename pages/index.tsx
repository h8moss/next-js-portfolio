import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import AnimatedButton from "../domain/index/AnimatedButton";
import i18n from "../domain/index/i18n";
import MainHeading from "../domain/index/MainHeading";
import MainTextWriter from "../domain/index/MainTextWriter";
import useI18n from "../hooks/useI18n";

const Home = () => {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = router.pathname == nextRoute;

  const {
    aboutButton,
    blogButton,
    contactButton,
    metaDescription,
    portfolioButton,
    title,
  } = useI18n(i18n);

  return (
    <>
      <Head>
        <title>Daniel Armenta</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className="h-screen w-screen overflow-clip flex flex-col">
        <NavBar onClick={(route) => setNextRoute(route)} />
        <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
          {shouldStay && (
            <div className="flex-grow flex flex-col text-center overflow-y-auto">
              <div className="h-0 md:h-1/4 xl:h-1/3" />
              <MainHeading>{title}</MainHeading>
              <motion.div animate={{ x: 0 }} exit={{ x: "-100vw" }}>
                <MainTextWriter onDone={() => {}} />
              </motion.div>
              <div className="my-auto flex justify-around flex-wrap">
                <AnimatedButton onClick={() => setNextRoute("/about")}>
                  {aboutButton}
                </AnimatedButton>
                <AnimatedButton onClick={() => setNextRoute("/portfolio")}>
                  {portfolioButton}
                </AnimatedButton>
                <AnimatedButton onClick={() => setNextRoute("/contact")}>
                  {contactButton}
                </AnimatedButton>
                <AnimatedButton onClick={() => setNextRoute("/blog")}>
                  {blogButton}
                </AnimatedButton>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
