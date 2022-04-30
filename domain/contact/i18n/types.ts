import { I18n } from "../../../types";

export interface ValidationErrorTextBody {
  invalidMail: string;
  missingMessage: string;
  messageTooLong: string;
  missingName: string;
}

interface LanguageBody {
  validationErrors: ValidationErrorTextBody;
  successMessage: string;
  submitErrorMessage: string;
  heading: string;
  title: string;
  description: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  captchaErrorText: string;
  submitText: string;
}

export type I18nBody = I18n<LanguageBody>;
