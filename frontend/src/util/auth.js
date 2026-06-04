
export function setLoginData(data) {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('accessTokenExpiresIn', data.accessTokenExpiresIn);
    // localStorage.setItem('refreshToken', data.refreshToken);
    // localStorage.setItem('refreshTokenExpiresIn', data.refreshTokenExpiresIn);

    const expireMinutes = parseInt(data.accessTokenExpiresIn, 10);
    if (!Number.isFinite(expireMinutes) || expireMinutes <= 0) {
        return;
    }
    const expiryMs = Date.now() + expireMinutes * 60 * 1000;
    localStorage.setItem('tokenExpiry', expiryMs.toString());

    setTimeout(() => {
        destroyToken();
    }, expireMinutes * 60 * 1000);
}

export function destroyToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessTokenExpiresIn');
    localStorage.removeItem('tokenExpiry');
}

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    const expiry = Number(localStorage.getItem('tokenExpiry'));
    if (!token || !expiry || Date.now() > expiry) {
        destroyToken();
        return false;
    }
    return true;
}

