import { I18n, TimeTexts } from "../../../types";

export type LanguageBody = {
  imageDescription: string;
  description: string;
  heading: string;
  title: string;
  formatLabel: string;
  timeText: TimeTexts;
};

export type I18nLangs = I18n<LanguageBody>;
