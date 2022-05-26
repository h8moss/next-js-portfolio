import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import Biography from "../domain/about/Biography";
import i18n from "../domain/about/i18n";
import ScrollToTop from "../domain/about/ScrollToTop";
import Selfie from "../domain/about/Selfie";
import useI18n from "../hooks/useI18n";
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

  const {
    description,
    formatLabel,
    heading,
    imageDescription,
    timeText,
    title,
  } = useI18n(i18n);

  const onDropdownChange = (e: any) => {
    const target = e.target as HTMLOptionElement;
    const stringValue = target.value as string;
    setDateFormat(stringValue as ExtendedDateFormat);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />{" "}
      </Head>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <>
            <ScrollToTop show={shouldStay} />
            <div className="w-screen overflow-x-clip">
              <motion.h1
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "100vw" }}
                className="text-center m-3"
              >
                {heading}
              </motion.h1>
            </div>
            <motion.div
              initial={{ scaleY: 0 }}
              exit={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
            >
              <label className="ml-3">{formatLabel}</label>
              <select
                value={dateFormat}
                onChange={onDropdownChange}
                className="rounded bg-zinc-900 capitalize cursor-pointer"
              >
                {eDateFormatValues
                  .map((v) => ({
                    value: v,
                    label: timeText[v],
                  }))
                  .map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </select>
            </motion.div>
            <Biography
              format={dateFormat}
              displayDecimal={dateFormat !== "closest"}
            />
            <Selfie description={imageDescription} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
