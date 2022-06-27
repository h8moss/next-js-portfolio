import { I18n } from "../../../types";

type LanguageBody = {
  title: string;
  description: string;
};

export type I18nBody = I18n<LanguageBody>;
