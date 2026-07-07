import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";

export default function AuthInitializer({ children }) {
    const setUserData = useAuthStore((state) => state.setUserData);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setAccessTokenExpiry = useAuthStore((state) => state.setAccessTokenExpiry);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
    const didRefresh = useRef(false);

    function setLoginData(data) {
        setUserData(data.user);
        setAccessToken(data.accessToken);
        const expireMinutes = parseInt(data.accessTokenExpiresIn, 10);
        const expiryMs = Date.now() + expireMinutes * 60 * 1000;
        setAccessTokenExpiry(expiryMs.toString());
        setIsLoggedIn(true);
    }

    useEffect(() => {
        if (didRefresh.current) return;
        didRefresh.current = true;
        async function authRefresh() {
            try {
                const response = await api.get('auth/refresh-access-token');
                setLoginData(response.data.data);
            } catch (_error) {
                setIsLoggedIn(false);
            } finally {
                setAuthLoading(false);
            }
        }
        authRefresh();
    }, [setAuthLoading, setIsLoggedIn]);
    
    return children;
}
