import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";

const About = () => {
  const router = useRouter();

  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute == router.pathname;

  return (
    <>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence>{shouldStay && <div></div>}</AnimatePresence>
    </>
  );
};

export default About;
