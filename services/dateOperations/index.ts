import { DateAgoTextBody } from "./types";

// https://stackoverflow.com/questions/4611754/javascript-convert-seconds-to-a-date-object#4611809
export function dateFromSeconds(secs: number) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

// HUGE oversimplification of durations of times
const generateTimes = () => {
  let secondsInMinute = 60;
  let minutesInHour = 60;
  let hoursInDay = 24;
  let daysInMonth = 30;
  let monthsInYear = 12;

  let secondsInHour = secondsInMinute * minutesInHour;
  let secondsInDay = secondsInHour * hoursInDay;
  let secondsInMonth = secondsInDay * daysInMonth;
  let secondsInYear = secondsInMonth * monthsInYear;

  let minutesInDay = minutesInHour * hoursInDay;
  let minutesInMonth = minutesInDay * daysInMonth;
  let minutesInYear = minutesInMonth * monthsInYear;

  let hoursInMonth = hoursInDay * daysInMonth;
  let hoursInYear = hoursInMonth * monthsInYear;

  let daysInYear = daysInMonth * monthsInYear;

  return {
    secondsInMinute,
    minutesInHour,
    hoursInDay,
    daysInMonth,
    monthsInYear,
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
