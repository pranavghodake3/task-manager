import { createContext, useEffect, useRef, useState } from "react";
import { getUserInfo } from "../util/auth";
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => getUserInfo() || {});
    const [accessToken, setAccessToken] = useState('');
    const [accessTokenExpiry, setAccessTokenExpiry] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const didRefresh = useRef(false);

    useEffect(() => {
        if (didRefresh.current) return;
        didRefresh.current = true;
        async function authRefresh(params) {
            try {
                const response = await api.get('auth/refresh-access-token');
                setAccessToken(response.data.data.accessToken);
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setAuthLoading(false);
            }
        }
        authRefresh();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, accessTokenExpiry, setAccessTokenExpiry, isLoggedIn, setIsLoggedIn, authLoading, setAuthLoading }}>
            {children}
        </AuthContext.Provider>
    )
};
