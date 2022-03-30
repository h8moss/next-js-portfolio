import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import Button from '../components/Button';
import NavBar from "../components/NavBar/Desktop";
import MainHeading from '../domain/index/MainHeading';
import MainTextWriter from "../domain/index/MainTextWriter";

const Home = () => {

  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = router.pathname == nextRoute;

  return (
    <div className="h-screen w-screen overflow-clip flex flex-col">
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay &&
          <div className="flex-grow flex flex-col text-center">
            <div className="h-1/4" />
            <MainHeading />
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: '-100vw' }}
            >
              <MainTextWriter onDone={() => { }} />

            </motion.div>
            <div className="my-auto flex justify-around" >
              <Button>
                Read more about me
              </Button>
              <Button>
                Check out what I&apos;ve built
              </Button>
              <Button>Contact me</Button>
              <Button>Read my Blog</Button>
            </div>
          </div>
        }
      </AnimatePresence>
    </div>
  );
}


export default Home;