import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { AuthContext} from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [accessTokenExpiry, setAccessTokenExpiry] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const didRefresh = useRef(false);

    useEffect(() => {
        if (didRefresh.current) return;
        didRefresh.current = true;
        async function authRefresh() {
            try {
                const response = await api.get('auth/refresh-access-token');

                setAccessToken(response.data.data.accessToken);
                setIsLoggedIn(true);
            } catch (_error) {
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
