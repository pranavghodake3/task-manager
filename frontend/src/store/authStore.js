import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(
  persist(
    immer((set) => ({
      user: {},
      accessToken: '',
      accessTokenExpiry: '',
      isLoggedIn: false,
      authLoading: true,
      setUserData: (user) => {
        return set((state) => {
          state.user = user;
        });
      },
      setAccessToken: (accessToken) => {
        return set((state) => {
          state.accessToken = accessToken;
        });
      },
      setAccessTokenExpiry: (accessTokenExpiry) => {
        return set((state) => {
          state.accessTokenExpiry = accessTokenExpiry;
        });
      },
      setIsLoggedIn: (isLoggedIn) => {
        return set((state) => {
          state.isLoggedIn = isLoggedIn;
        });
      },
      setAuthLoading: (authLoading) => {
        return set((state) => {
          state.authLoading = authLoading;
        });
      },
    })),
    {
      name: "task-manager-auth-store",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        accessTokenExpiry: state.accessTokenExpiry,
        isLoggedIn: state.isLoggedIn,
        authLoading: state.authLoading,
      }),
    }
  )
);
