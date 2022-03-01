export type Project = {
  title: string;
  description: string;
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
