import { useEffect, useRef, useState } from "react";

import useI18n from "../../hooks/useI18n";
import { dateInFormat } from "../../services/dateOperations";
import { ExtendedDateFormat } from "../../services/dateOperations/types";
import i18n from "./i18n";

interface Props {
  initialDate: Date;
  finalDate?: Date;
  displayAgo?: boolean;
  format: ExtendedDateFormat;
  round: "down" | "up" | "closest" | "none";
  shouldUpdate?: boolean;
  label?: string;
}

const TimeAgo = ({
  initialDate,
  finalDate,
  format,
  displayAgo = false,
  round = "none",
  shouldUpdate = false,
  label,
}: Props) => {
  const [initialTime, setTime] = useState(null);
  const finalFormat = useRef<ExtendedDateFormat>(format);

  useEffect(() => {
    const setDateAndFormat = () => {
      const [newDate, newFormat] = dateInFormat(initialDate, finalDate, format);
      setTime(newDate);
      finalFormat.current = newFormat;
    };

    setDateAndFormat();

    if (shouldUpdate) {
      const timeout = setInterval(() => {
        if (shouldUpdate && !finalDate) {
          setDateAndFormat();
        }
      }, 10);
      return () => clearInterval(timeout);
    }
  }, [initialDate, finalDate, format, shouldUpdate]);

  let time = 0;

  switch (round) {
    case "closest":
      time = Math.round(initialTime);
      break;
    case "down":
      time = Math.floor(initialTime);
      break;
    case "up":
      time = Math.ceil(initialTime);
      break;
    case "none":
      time = Math.round(initialTime * 1000) / 1000;
      break;
  }

  if (!shouldUpdate && Math.round(time) - time < Number.EPSILON) {
    round = "closest";
  }

  const lang = useI18n(i18n);

  const pluralText =
    Math.abs(time - 1) < Number.EPSILON ? "singular" : "plural";

  if (!label)
    label =
      lang[pluralText][displayAgo ? "withAgo" : "withoutAgo"][
        finalFormat.current
      ];

  let finalTime = round === "none" ? time.toFixed(3) : time.toString();

  const text = label.replace("_", finalTime);

  return <span>{text}</span>;
};

export default TimeAgo;
