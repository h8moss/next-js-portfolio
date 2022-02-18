import { createContext } from "react";

import AuthService from "../services/firebase/auth";

const AuthContext = createContext(new AuthService());

export default AuthContext;
