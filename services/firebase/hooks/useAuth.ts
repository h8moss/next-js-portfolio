import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";

import { auth } from "../";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

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
