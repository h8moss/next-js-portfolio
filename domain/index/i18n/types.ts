import { I18n } from "../../../types";

export type LanguageBody = {
  title: string;
  metaDescription: string;
  description: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  lookAtSocials: string;
};

export type i18nLangs = I18n<LanguageBody>;
