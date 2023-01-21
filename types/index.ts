import { locales } from "../constants";
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

export type KeyValueService<T, U> = {
  setValue: (key: T, value: U) => void;
  getValue: (key: T) => U | null;
  addListener: (key: T, handler: (value: U) => unknown) => void;
  removeListener: (key: T, handler: (value: U) => unknown) => void;
  notifyListeners: (key: T) => void;
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

export type Locale = typeof locales[number];

export type I18n<T> = {
  [key in Locale]: T;
};

export type BlogPostData = {
  title: string;
  tags: string[];
  body: string;
};

export type BlogPost = BlogPostData & {
  id: string;
  created: { seconds: number };
};

export type TimeTexts = {
  [key in ExtendedDateFormat]: string;
};

export type Theme = {
  particleColor: string;
  textColorClass: string;
  buttonTextColorClass: string;
  bgColorClass: string;
  highlightBgColorClass: string;

  bodyClass: string;

  toggleName: string;
  toggleBg: string;
};
