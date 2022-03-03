import { I18n } from "../../../types";

export type LanguageBody = {
  about: string;
  portfolio: string;
  contact: string;
  blog: string;
  signin: string;
  logout: string;
  language: string;
};

export type I18nLangs = I18n<LanguageBody>;
