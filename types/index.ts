export type Project = {
  title: string;
  description: string;
  tags: string[];
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
