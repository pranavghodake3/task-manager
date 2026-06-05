import { createContext, useState } from "react";
import { getUserInfo } from "../util/auth";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUserInfo() || {});

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
};
