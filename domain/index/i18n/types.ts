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
  aboutButton: string;
  portfolioButton: string;
  contactButton: string;
  blogButton: string;
};

export type i18nLangs = I18n<LanguageBody>;
