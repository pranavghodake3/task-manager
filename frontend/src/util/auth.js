import api from "../services/api";

export async function destroyToken() {
    await api.get('auth/logout');
}

export function isLoggedIn({ accessToken, isUserLoggedIn}) {
    // const expiry = Number(accessTokenExpiry);
    if (!accessToken && !isUserLoggedIn) {
        destroyToken();
        return false;
    }
    return true;
}

