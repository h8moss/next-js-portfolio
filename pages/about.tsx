import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import Card from "../components/Card";
import NavBar from "../components/NavBar";

const About = () => {
  const router = useRouter();

  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute == router.pathname;

  return (
    <>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <div className="">
              My real name is Daniel Armenta, I go by h8m0ss everywhere,
            </div>
            <div>
              Birthdate and more about me, like the fact that I was born in
              Mexico and have been living in it ever since, I am 20 as of now :)
            </div>
            <div>
              Programming career time and shit and you know things like how and
              why I decided to start programming and stuff like what I like
              about it and shit and giggles
            </div>
            <div>
              I am currently not working, just studying and shit at UP which is
              situated here in Mexico, studying to become an engineer in
              animation and video-games
            </div>
            <div>
              Hobbies and other important (or not so important) info about me
              and stuff or whatever
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
