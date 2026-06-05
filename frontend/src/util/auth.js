
export function setLoginData(data) {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    const expireMinutes = parseInt(data.accessTokenExpiresIn, 10);
    if (!Number.isFinite(expireMinutes) || expireMinutes <= 0) {
        return;
    }
    const expiryMs = Date.now() + expireMinutes * 60 * 1000;
    localStorage.setItem('accessTokenExpiry', expiryMs.toString());

    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('refreshTokenExpiry', data.refreshTokenExpiresIn);
}

export function destroyToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiry');
}

export function isLoggedIn() {
    const accessToken = localStorage.getItem('accessToken');
    const expiry = Number(localStorage.getItem('accessTokenExpiry'));
    if (!accessToken || !expiry || Date.now() > expiry) {
        destroyToken();
        return false;
    }
    return true;
}

export function getUserInfo(){
    const user = JSON.parse(localStorage.getItem('user'));

    return user;
}

