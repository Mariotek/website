const MESSAGES = {
    1001: "لاگین شما منقضی شده است",
    1002: "توکن شما منقضی شده است",
    1003: "نام کاربری/آدرس ایمیل اشتباه است",
    1004: "رمز عبور اشتباه است",
};

const getErrorMessage = (code , message = "") => {
    if(parseInt(code) > 0){
        message = MESSAGES[code]
    }
    return message;
};

export default getErrorMessage;