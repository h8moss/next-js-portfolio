import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import Biography from "../domain/about/Biography";
import Selfie from "../domain/about/Selfie";
import { ExtendedDateFormat } from "../services/dateOperations/types";

const eDateFormatValues: ExtendedDateFormat[] = [
  "closest",
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
  "avengers-runtime",
];

const About = () => {
  const [dateFormat, setDateFormat] = useState<ExtendedDateFormat>("closest");

  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute == router.pathname;

  const onDropdownChange = (e: any) => {
    const target = e.target as HTMLOptionElement;
    const stringValue = target.value as string;
    setDateFormat(stringValue as ExtendedDateFormat);
  };

  return (
    <>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <>
            <motion.h1
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              exit={{ x: "100vw" }}
              className="text-center m-3"
            >
              Auto biography
            </motion.h1>
            <label className="ml-3">Display times in: </label>
            <select
              value={dateFormat}
              onChange={onDropdownChange}
              className="rounded bg-zinc-900 capitalize cursor-pointer"
            >
              {eDateFormatValues
                .map((v) => ({
                  value: v,
                  label: v == "avengers-runtime" ? "Avengers movies" : v,
                }))
                .map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </select>
            <Biography
              format={dateFormat}
              displayDecimal={dateFormat !== "closest"}
            />
            <Selfie />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
