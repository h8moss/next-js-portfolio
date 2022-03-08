import { I18n } from "../../../types";

export type ErrorMessages = {
  required: string;
  invalidEmail: string;
  passwordLength: string;
  passwordLengthMin: string;
  passwordMustContain: string;
  passwordMatch: string;
};

export type LanguageBody = {
  registeringErrorMessage: string;
  signinErrorMessage: string;
  signinTxt: string;
  registerTxt: string;
  emailTxt: string;
  passwordTxt: string;
  repeatTxt: string;
  switchToRegisterTxt: string;
  switchToSigninTxt: string;
  signinWithGoogleTxt: string;
  orTxt: string;
  errorMessages: ErrorMessages;
};

export type I18nBody = I18n<LanguageBody>;
