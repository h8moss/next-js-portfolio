import { Theme } from "./types";

export const darkTheme: Theme = {
  bgColorClass: "bg-gray-800",
  buttonTextColorClass: "text-white",
  highlightBgColorClass: "bg-black",
  textColorClass: "text-white",

  bodyClass: "dark-theme",

  toggleName: "Light",
  toggleBg: "bg-white",
};

export const mainTheme: Theme = {
  bgColorClass: "bg-gray-100",
  buttonTextColorClass: "text-black",
  highlightBgColorClass: "bg-white",
  textColorClass: "text-white",

  bodyClass: "main-theme",

  toggleName: "Dark",
  toggleBg: "bg-black",
};
