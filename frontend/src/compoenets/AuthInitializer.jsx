import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { refreshAccessToken } from "../services/authService";

export default function AuthInitializer({ children }) {
    const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
    const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
    const didRefresh = useRef(false);

    useEffect(() => {
        if (didRefresh.current) return;
        didRefresh.current = true;

        async function authRefresh() {
            try {
                await refreshAccessToken();
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
