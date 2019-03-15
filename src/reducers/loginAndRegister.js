import { actionTypes } from '../actions/loginAndRegister';
import errorMapper from './../helpers/errorMessageMapper';

const initialState = [];


const ACTION_HANDLERS = {

    'RESET_MESSAGE': () => ({
        message: { title: '' }
    }),

    [`${actionTypes.DO_LOGIN}_REQUEST`]: () => ({
        loggingIn: true,
        loggedIn : false,
        signingUp: false,
        signedUp : false,
        message  : { title: '' },
        userInfo : null
    }),

    [`${actionTypes.DO_LOGIN}_SUCCESS`]: (state, action) => {
        const data = action.data;
        if (action.data.status) {
            return {
                loggingIn: false,
                signingUp: false,
                signedUp : false,
                loggedIn : true,
                userInfo : data.data,
                message  : {
                    type : 'success',
                    title: 'ورود با موفقیت انجام شد .'
                }
            };
        } else {
            return {
                loggingIn: false,
                loggedIn : false,
                signingUp: false,
                signedUp : false,
                userInfo : null,
                message  : {
                    type : 'error',
                    title: errorMapper(data.code, data.message)
                }
            };
        }
    },

    [`${actionTypes.DO_LOGIN}_FAILURE`]: () => ({
        loggingIn: false,
        loggedIn : false,
        signingUp: false,
        signedUp : false,
        userInfo : null,
        message  : {
            type : 'error',
            title: 'خطا در برقراری ارتباط ! لطفا مجددا تلاش نمایید.'
        }
    }),


    // START REGISTER DISPATCH
    [`${actionTypes.DO_REGISTER}_REQUEST`]: () => ({
        signingUp: true
    }),
    [`${actionTypes.DO_REGISTER}_SUCCESS`]: (state, action) => {
        const data = action.data;
        if (action.data.status) {
            return {
                signingUp: false,
                signedUp : true,
                loggingIn: false,
                loggedIn : false,
                userInfo : data.data,
                message  : {
                    type : 'success',
                    title: 'ثبت نام با موفقیت انجام شد .'
                }
            };
        } else {
            return {
                signingUp: false,
                signedUp : false,
                loggingIn: false,
                loggedIn : false,
                userInfo : null,
                message  : {
                    type : 'error',
                    title: errorMapper(data.code, data.message)
                }
            };
        }
    },
    [`${actionTypes.DO_LOGIN}_FAILURE`]: () => ({
        signingUp: false,
        signedUp : false,
        loggingIn: false,
        loggedIn : false,
        userInfo : null,
        message  : {
            type : 'error',
            title: 'خطا در برقراری ارتباط ! لطفا مجددا تلاش نمایید.'
        }
    }),


    [`${actionTypes.DO_LOGOUT}_SUCCESS`]: () => ({
        loggedIn : false,
        userInfo : null,
        loggingIn: false,
        signingUp: false,
        signedUp : false,
        message  : null
    }),

    [`${actionTypes.CHECK_LOGIN}_SUCCESS`]: (state, action) => {
        const data = action.data;
        if (action.data.status) {
            return {
                loggingIn: false,
                loggedIn : true,
                signingUp: false,
                signedUp : false,
                userInfo : {
                    token: state.userInfo.token || '',
                    user : data.data
                },
                message: {
                    type : 'success',
                    title: 'بررسی اطلاعات کاربری با موفقیت انجام شد .'
                }
            };
        } else {
            return {
                loggingIn: false,
                loggedIn : false,
                signingUp: false,
                signedUp : false,
                userInfo : null,
                message  : {
                    type : 'error',
                    title: errorMapper(data.code, data.message)
                }
            };
        }
    }
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
};
