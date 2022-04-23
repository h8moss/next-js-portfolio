import { ExtendedDateFormat } from "../services/dateOperations/types";

export type Project = {
  title: I18n<string>;
  description: I18n<string>;
  tags: string[];
  links?: ImageLinkData[];
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

export type I18n<T> = {
  en: T;
  es: T;
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
