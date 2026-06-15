import api from "../services/api";

export async function destroyToken() {
    await api.get('auth/logout');
    localStorage.removeItem('user');
}

export function isLoggedIn(AuthContextData) {
    const accessToken = AuthContextData.accessToken;
    // const expiry = Number(AuthContextData.accessTokenExpiry);
    if (!accessToken && !AuthContextData.isLoggedIn) {
        destroyToken();
        return false;
    }
    return true;
}

export function getUserInfo(){
    const user = JSON.parse(localStorage.getItem('user'));

    return user;
}

