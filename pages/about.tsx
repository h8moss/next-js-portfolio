import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import Biography from "../domain/about/Biography";
import { ExtendedDateFormat } from "../services/dateOperations/types";

const About = () => {
  const [dateFormat, setDateFormat] = useState<ExtendedDateFormat>("closest");

  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute == router.pathname;

  return (
    <>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <>
            <div className="flex flex-row justify-end">
              <select value={dateFormat} onChange={(e) => {}}></select>
            </div>
            <h1 className="text-center m-3">Auto biography</h1>
            <Biography format="closest" />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
