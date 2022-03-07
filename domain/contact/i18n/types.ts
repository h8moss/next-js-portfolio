import { I18n } from "../../../types";

export type LanguageBody = {
  title: string;
  nameQuestion: string;
  emailQuestion: string;
  optionalText: string;
  messageQuestion: string;
  submitButton: string;
  errorMessage: string;
  successMessage: string;
};

export type I18nLangs = I18n<LanguageBody>;
