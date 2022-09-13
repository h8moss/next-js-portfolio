import { ExtendedDateFormat } from "../services/dateOperations/types";

export type Project = {
  title: I18n<string>;
  description: I18n<string>;
  tags: string[];
  links?: ImageLinkData[];
};

export type DarkModeService = {
  setValue: (v: boolean) => void;
  getValue: () => boolean;
  toggleValue: () => void;
};

export type AppUser = {
  photoURL: string;
  displayName: string;
  mail: string;
  isAdmin: boolean;
};

export enum SignInState {
  signingIn,
  signedOut,
  signedIn,
}

export enum TagsState {
  selected,
  unselected,
  notVisible,
}

export type ImageLinkData = {
  imageSource: string;
  alt: string;
  url: string;
};

export type Locale = "en" | "es";

export type I18n<T> = {
  [key in Locale]: T;
};

export type BlogPost = {
  id: string;
  title: string;
  tags: string[];
  text: string;
  created: { seconds: number };
};

export type TimeTexts = {
  [key in ExtendedDateFormat]: string;
};

export type Theme = {
  textColorClass: string;
  buttonTextColorClass: string;
  bgColorClass: string;
  highlightBgColorClass: string;

  bodyClass: string;

  toggleName: string;
  toggleBg: string;
};
