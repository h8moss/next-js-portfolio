import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { AppUser } from "../../types";
import { SignInState } from "../../types";
import { app } from "./firebase";
import { db } from "./firestore";

const getIsAdmin = async (uid): Promise<boolean> => {
  let document = doc(db, `/users/${uid}`);
  let snapshot = await getDoc(document);
  if (snapshot.exists()) {
    let data = snapshot.data();
    return data.isAdmin;
  }
  return false;
};

const appUserFromUser = async (user: User): Promise<AppUser> => {
  let isAdmin = await getIsAdmin(user.uid);

  return {
    displayName: user.displayName,
    isAdmin: isAdmin,
    mail: user.email,
    photoURL: user.photoURL,
  };
};

class AuthService {
  googleAuth: GoogleAuthProvider;
  user: AppUser;
  auth: Auth;
  userListeners: { callback: () => any; key: String }[];
  signInState: SignInState;

  constructor() {
    this.googleAuth = new GoogleAuthProvider();
    this.user = null;
    this.auth = getAuth(app);
    this.userListeners = [];
    this.signInState = SignInState.signedOut;

    onAuthStateChanged(this.auth, async (user) => {
      this.user = user === null ? null : await appUserFromUser(user);
      this.notifyUserListeners();
    });
  }

  private notifyUserListeners() {
    for (let i = 0; i < this.userListeners.length; i++) {
      this.userListeners[i].callback();
    }
  }

  addUserListener(callback: () => any, key = "") {
    this.userListeners.push({ callback: callback, key: key });
  }

  removeUserListener(callback: () => any, key = "") {
    let index = -1;
    for (let i = 0; i < this.userListeners.length; i++) {
      if (key !== "") {
        if (this.userListeners[i].key === key) {
          index = i;
          break;
        }
      } else if (this.userListeners[i].callback === callback) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.userListeners = this.userListeners.splice(index, 1);
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.signInState = SignInState.signedOut;
  }

  async signInWithGoogle() {
    this.signInState = SignInState.signingIn;
    try {
      await signInWithPopup(this.auth, this.googleAuth);
    } catch (e) {
      this.signInState = SignInState.signedOut;
      throw e;
    }
    this.signInState = SignInState.signedIn;
  }
}

let authService: AuthService = null;

export default function getAuthService() {
  if (authService === null) {
    authService = new AuthService();
  }

  return authService;
}
