import axios from "axios";
import { refreshAccessToken, logout } from "./authService";
import { useAuthStore } from "../store/authStore";
import { X_DEVICE } from "../constants";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers['x-device'] = X_DEVICE;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
      } catch (_refreshError) {
        logout();
        return Promise.reject(_refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
