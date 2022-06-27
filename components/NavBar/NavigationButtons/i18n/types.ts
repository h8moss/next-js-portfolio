import { I18n } from "../../../../types";

type LanguageBody = {
  about: string;
  portfolio: string;
  contact: string;
  blog: string;
};

export type I18nBody = I18n<LanguageBody>;
