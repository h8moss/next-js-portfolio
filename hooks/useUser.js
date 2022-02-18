import { useState } from "react";
import { useEffect } from "react";

import useAuth from "./useAuth";

export default function useUser() {

    let auth = useAuth();
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