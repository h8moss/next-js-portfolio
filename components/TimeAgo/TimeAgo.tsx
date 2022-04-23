import { useEffect, useRef, useState } from "react";

import useI18n from "../../hooks/useI18n";
import { dateInFormat } from "../../services/dateOperations";
import { ExtendedDateFormat } from "../../services/dateOperations/types";
import i18n from "./i18n";

interface Props {
  initialDate: Date;
  finalDate?: Date;
  displayAgo?: boolean;
  format:
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "months"
    | "years"
    | "avengers-runtime";
  useDecimal?: boolean;
  shouldUpdate?: boolean;
  label?: string;
}

// Shamelessly stolen from:
// https://stackoverflow.com/a/9232092/12638504
const truncateDecimals = (num: number, digits: number): number => {
  var multiplier = Math.pow(10, digits),
    adjustedNum = num * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};

const TimeAgo = ({
  initialDate,
  finalDate,
  format,
  displayAgo = false,
  useDecimal = false,
  shouldUpdate = false,
  label,
}: Props) => {
  const [initialTime, setTime] = useState(null);
  let finalFormat = useRef<ExtendedDateFormat>(format);

  useEffect(() => {
    const setDateAndFormat = () => {
      const [newDate, newFormat] = dateInFormat(initialDate, finalDate, format);
      setTime(newDate);
      finalFormat.current = newFormat;
    };

    setDateAndFormat();

    if (shouldUpdate) {
      let timeout = setInterval(() => {
        if (shouldUpdate && !finalDate) {
          setDateAndFormat();
        }
      }, 10);
      return () => clearInterval(timeout);
    }
  }, [initialDate, finalDate, format, shouldUpdate]);

  let time = 0;

  if (!useDecimal) {
    time = Math.round(initialTime);
  } else {
    time = Math.round(initialTime * 100) / 100;
  }

  const lang = useI18n(i18n);

  const pluralText = time - 1 === Number.EPSILON ? "singular" : "plural";

  if (!label)
    label = lang[pluralText][displayAgo ? "withAgo" : "withoutAgo"][format];
  const text = label.replace(
    "_",
    useDecimal ? time.toFixed() : time.toString()
  );

  return <span>{text}</span>;
};

export default TimeAgo;
