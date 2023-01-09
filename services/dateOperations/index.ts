import { DateAgoTextBody, DateFormat, ExtendedDateFormat } from "./types";

const generateTimes = () => {
  // oversimplification of durations of times
  const msInSecond = 1000;
  const secondsInMinute = 60;
  const minutesInHour = 60;
  const hoursInDay = 24;
  const daysInMonth = 30;
  const monthsInYear = 12;

  const msInMinute = msInSecond * secondsInMinute;
  const msInHour = msInMinute * minutesInHour;
  const msInDay = msInHour * hoursInDay;
  const msInMonth = msInDay * daysInMonth;
  const msInYear = msInMonth * monthsInYear;

  const secondsInHour = secondsInMinute * minutesInHour;
  const secondsInDay = secondsInHour * hoursInDay;
  const secondsInMonth = secondsInDay * daysInMonth;
  const secondsInYear = secondsInMonth * monthsInYear;

  const minutesInDay = minutesInHour * hoursInDay;
  const minutesInMonth = minutesInDay * daysInMonth;
  const minutesInYear = minutesInMonth * monthsInYear;

  const hoursInMonth = hoursInDay * daysInMonth;
  const hoursInYear = hoursInMonth * monthsInYear;

  const daysInYear = daysInMonth * monthsInYear;

  return {
    msInSecond,
    secondsInMinute,
    minutesInHour,
    hoursInDay,
    daysInMonth,
    monthsInYear,
    msInMinute,
    msInHour,
    msInDay,
    msInMonth,
    msInYear,
    secondsInHour,
    secondsInDay,
    secondsInMonth,
    secondsInYear,
    minutesInDay,
    minutesInMonth,
    minutesInYear,
    hoursInMonth,
    hoursInYear,
    daysInYear,
  };
};

const times = generateTimes();

const avengersRuntimeInSeconds =
  2 * times.secondsInHour + 23 * times.secondsInMinute;

// https://stackoverflow.com/questions/4611754/javascript-convert-seconds-to-a-date-object#4611809
export function dateFromSeconds(secs: number) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

const dateInFormat = (
  initialDate: Date,
  finalDate: Date,
  format: ExtendedDateFormat
): [number, ExtendedDateFormat] => {
  if (!finalDate) finalDate = new Date();
  const difference = finalDate.getTime() - initialDate.getTime();

  if (format == "closest") {
    format = getClosestFormat(difference);
  }

  let dividend = 0;
  switch (format) {
    case "avengers-runtime":
      dividend = avengersRuntimeInSeconds * times.msInSecond;
      break;
    case "days":
      dividend = times.msInDay;
      break;
    case "hours":
      dividend = times.msInHour;
      break;
    case "milliseconds":
      dividend = 1;
      break;
    case "minutes":
      dividend = times.msInMinute;
      break;
    case "months":
      dividend = times.msInMonth;
      break;
    case "seconds":
      dividend = times.msInSecond;
      break;
    case "years":
      dividend = times.msInYear;
      break;
    default:
      throw "Format not implemented yet";
  }

  return [difference / dividend, format];
};

const getClosestFormat = (difference: number): DateFormat => {
  const { msInSecond, msInMinute, msInHour, msInDay, msInMonth, msInYear } =
    times;

  if (difference < msInSecond) {
    return "milliseconds";
  }
  if (difference < msInMinute) {
    return "seconds";
  }
  if (difference < msInHour) {
    return "minutes";
  }
  if (difference < msInDay) {
    return "hours";
  }
  if (difference < msInMonth) {
    return "days";
  }
  if (difference < msInYear) {
    return "months";
  }
  return "years";
};

const getTimeTexts = (lang: DateAgoTextBody) => {
  const {
    secondsAgo,
    minuteAgo,
    minutesAgo,
    hourAgo,
    hoursAgo,
    dayAgo,
    daysAgo,
    monthAgo,
    monthsAgo,
    yearAgo,
    yearsAgo,
  } = lang;

  return {
    values: [
      {
        text: secondsAgo,
        value: times.secondsInMinute,
      },
      {
        text: minuteAgo,
        value: times.secondsInMinute * 2,
      },
      {
        text: minutesAgo,
        value: times.secondsInHour,
        divide: times.secondsInMinute,
      },
      {
        text: hourAgo,
        value: times.secondsInHour * 2,
      },
      {
        text: hoursAgo,
        value: times.secondsInDay,
        divide: times.secondsInHour,
      },
      {
        text: dayAgo,
        value: times.secondsInDay * 2,
      },
      {
        text: daysAgo,
        value: times.secondsInMonth,
        divide: times.secondsInDay,
      },
      {
        text: monthAgo,
        value: times.secondsInMonth * 2,
      },
      {
        text: monthsAgo,
        value: times.secondsInYear,
        divide: times.secondsInMonth,
      },
      {
        text: yearAgo,
        value: times.secondsInYear * 2,
      },
      {
        text: yearsAgo,
        value: Infinity,
        divide: times.secondsInYear,
      },
    ],
  };
};

export function getAgoString(date: Date, language: DateAgoTextBody) {
  let now = Math.floor(Date.now() / 1000);
  let dateSeconds = Math.floor(date.getTime() / 1000);
  let difference = now - dateSeconds;

  for (let time of getTimeTexts(language).values) {
    if (difference < time.value) {
      let value = "";
      if (time.text.includes("_")) {
        if (time.divide !== undefined) {
          value = Math.floor(difference / time.divide).toString();
        } else {
          value = time.value.toString();
        }
      }
      return time.text.replace("_", value);
    }
  }
}

export { dateInFormat };
