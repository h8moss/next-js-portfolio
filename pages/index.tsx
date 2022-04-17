import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import AnimatedButton from "../domain/index/AnimatedButton";
import MainHeading from "../domain/index/MainHeading";
import MainTextWriter from "../domain/index/MainTextWriter";

const Home = () => {
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = router.pathname == nextRoute;

  return (
    <div className="h-screen w-screen overflow-clip flex flex-col">
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <div className="flex-grow flex flex-col text-center overflow-y-auto">
            <div className="h-0 md:h-1/4 xl:h-1/3" />
            <MainHeading />
            <motion.div animate={{ x: 0 }} exit={{ x: "-100vw" }}>
              <MainTextWriter onDone={() => {}} />
            </motion.div>
            <div className="my-auto flex justify-around flex-wrap">
              <AnimatedButton onClick={() => setNextRoute("/about")}>
                Read more about me
              </AnimatedButton>
              <AnimatedButton onClick={() => setNextRoute("/portfolio")}>
                Check out what I&apos;ve built
              </AnimatedButton>
              <AnimatedButton onClick={() => setNextRoute("/contact")}>
                Contact me
              </AnimatedButton>
              <AnimatedButton onClick={() => setNextRoute("/blog")}>
                Read my Blog
              </AnimatedButton>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
