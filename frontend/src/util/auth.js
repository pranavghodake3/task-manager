
export function setLoginData(data) {
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('accessTokenExpiresIn', data.accessTokenExpiresIn);
    // localStorage.setItem('refreshToken', data.refreshToken);
    // localStorage.setItem('refreshTokenExpiresIn', data.refreshTokenExpiresIn);
    const expireMinutes = data.accessTokenExpiresIn.split('')[0];
    setTimeout(() => {
        destroyToken();
    }, expireMinutes * 60 * 1000);
}

export function destroyToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessTokenExpiresIn');
}

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    console.log('isLoggedIn token: ', token);
    if(!token || token == null || token == undefined || typeof token == undefined){
        return false;
    }
    return true;
}

