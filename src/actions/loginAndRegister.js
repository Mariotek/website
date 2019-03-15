export const actionTypes = {
    DO_LOGIN   : 'DO_LOGIN',
    CHECK_LOGIN: 'CHECK_LOGIN',
    DO_REGISTER: 'DO_REGISTER',
    DO_LOGOUT  : 'DO_LOGOUT'
};

export const doLogin = (username, password, remember) => ({
    type  : actionTypes.DO_LOGIN,
    remote: '/login',
    method: 'post',
    body  : {
        username,
        password,
        remember
    }
});


export const checkLogin = userID => ({
    type  : actionTypes.CHECK_LOGIN,
    remote: `/panel/userSingle?id=${userID}`,
    method: 'get'
});

export const doRegister = (username, emailAddress, password, passwordRepeat) => ({
    type  : actionTypes.DO_REGISTER,
    remote: '/register',
    method: 'post',
    body  : {
        email: emailAddress,
        username,
        password,
        passwordRepeat
    }
});


export const doLogout = () => ({
    type  : actionTypes.DO_LOGOUT,
    remote: '/logout',
    method: 'post'
});
