import { I18n } from "../../../types";

export type LanguageBody = {
  message: string;
};

export type I18nLangs = I18n<LanguageBody>;
