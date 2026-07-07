import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(immer((set) => ({
    user: {},
    accessToken: '',
    accessTokenExpiry: '',
    isLoggedIn: false,
    authLoading: true,
    // count: 0,
    // setCount: () => set((state) => { count: state.count + 1}),
    setUserData: (user) => {
        return set((state) => {
            state.user = user;
        })
    },
    setAccessToken: (accessToken) => {
        return set((state) => {
            state.accessToken = accessToken;
        })
    },
    setAccessTokenExpiry: (accessTokenExpiry) => {
        return set((state) => {
            state.accessTokenExpiry = accessTokenExpiry;
        })
    },
    setIsLoggedIn: (isLoggedIn) => {
        return set ((state) => {
            state.isLoggedIn = isLoggedIn;
        })
    },
    setAuthLoading: (authLoading) => {
        return set((state) => {
            state.authLoading = authLoading;
        });
    }
})));
