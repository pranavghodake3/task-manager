import axios from "axios";
import { useAuthStore } from "../store/authStore";

const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export function setLoginStore(data) {
  const { setUserData, setAccessToken, setAccessTokenExpiry, setIsLoggedIn } = useAuthStore.getState();

  setUserData(data.user);
  setAccessToken(data.accessToken);

  const expireMinutes = parseInt(data.accessTokenExpiresIn, 10);
  const expiryMs = Date.now() + expireMinutes * 60 * 1000;
  setAccessTokenExpiry(expiryMs.toString());
  setIsLoggedIn(true);
}

export async function refreshAccessToken() {
  const response = await authApi.get("/auth/refresh-access-token");
  setLoginStore(response.data.data);
  return response;
}

export function logout() {
  const { setUserData, setAccessToken, setAccessTokenExpiry, setIsLoggedIn } = useAuthStore.getState();
  setUserData({});
  setAccessToken("");
  setAccessTokenExpiry("");
  setIsLoggedIn(false);
}
