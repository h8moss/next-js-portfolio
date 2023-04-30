import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

import { auth } from "../";
import { useRouter } from "next/router";

interface Options {
  required?: boolean;
  loginPage?: string;
}

const useAuth = ({
  required = false,
  loginPage = "/admin/sign-in",
}: Options) => {
  const [user, _setUser] = useState<User | null>(auth.currentUser);

  const router = useRouter();

  const setUser = (u: User | null) => {
    _setUser(u);

    if (!u && required) {
      router.push(loginPage);
    }
  };

  const signInWithMail = useCallback(async (mail: string, password: string) => {
    await signInWithEmailAndPassword(auth, mail, password);
  }, []);

  const _signOut = useCallback(async () => signOut(auth), []);

  const isSignedIn = useMemo(() => user !== null, [user]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return {
    user,
    isSignedIn,
    signInWithMail,
    signOut: _signOut,
  };
};

export default useAuth;
