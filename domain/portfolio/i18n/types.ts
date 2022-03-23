import { I18n } from "../../../types";

export type LanguageBody = {
  title: string;
  metaDescription: string;
};

export type I18nBody = I18n<LanguageBody>;
