export type Project = {
  title: String;
  description: String;
  tags: String[];
};

export type AppUser = {
  photoURL: String;
  displayName: String;
  mail: String;
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
