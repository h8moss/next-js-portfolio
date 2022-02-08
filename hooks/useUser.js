import { useState } from "react";
import { useEffect } from "react";

import getAuthService from "../services/firebase/auth";

export default function useUser() {
    let auth = getAuthService();
    let [user, setUser] = useState(auth.user);

    useEffect(() => {
        const userChanged = () => {
            setUser(auth.user);
        }

        auth.addUserListener(userChanged);

        return () => auth.removeUserListener(userChanged);
    }, [auth]);

    return user;
}