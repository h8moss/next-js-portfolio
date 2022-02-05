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

const timeTexts = {
  values: [
    {
      text: "a few seconds ago",
      value: times.secondsInMinute,
    },
    {
      text: "a minute ago",
      value: times.secondsInMinute * 2,
    },
    {
      text: " minutes ago",
      value: times.secondsInHour,
      showValue: true,
      divide: times.secondsInMinute,
    },
    {
      text: "an hour ago",
      value: times.secondsInHour * 2,
    },
    {
      text: " hours ago",
      value: times.secondsInDay,
      showValue: true,
      divide: times.secondsInHour,
    },
    {
      text: "yesterday",
      value: times.secondsInDay * 2,
    },
    {
      text: " days ago",
      value: times.secondsInMonth,
      showValue: true,
      divide: times.secondsInDay,
    },
    {
      text: "a month ago",
      value: times.secondsInMonth * 2,
    },
    {
      text: " months ago",
      value: times.secondsInYear,
      showValue: true,
      divide: times.secondsInMonth,
    },
    {
      text: "a year ago",
      value: times.secondsInYear * 2,
    },
    {
      text: " years ago",
      value: NaN, // infinity
      showValue: true,
      divide: times.secondsInYear,
    },
  ],
};

export function getAgoString(date: Date) {
  let now = Math.floor(Date.now() / 1000);
  let dateSeconds = Math.floor(date.getTime() / 1000);
  let difference = now - dateSeconds;

  for (let time of timeTexts.values) {
    if (time.value === NaN || difference < time.value) {
      let value = "";
      if (time.showValue) {
        if (time.divide !== undefined) {
          value = Math.floor(difference / time.divide).toString();
        } else {
          value = time.value.toString();
        }
      }
      return value + time.text;
    }
  }
}
