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
  useDecimal?: boolean;
  shouldUpdate?: boolean;
  label?: string;
}

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
    time = Math.round(initialTime * 1000) / 1000;
  }

  if (!shouldUpdate && Math.round(time) - time < Number.EPSILON) {
    useDecimal = false;
  }

  const lang = useI18n(i18n);

  const pluralText = time - 1 < Number.EPSILON ? "singular" : "plural";

  if (!label)
    label =
      lang[pluralText][displayAgo ? "withAgo" : "withoutAgo"][
        finalFormat.current
      ];
  const text = label.replace(
    "_",
    useDecimal ? time.toFixed(3) : time.toString()
  );

  return <span>{text}</span>;
};

export default TimeAgo;
