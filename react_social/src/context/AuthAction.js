export const LoginStart = (userCredientials) => ({
    type: "LOGIN_START"
});
export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS", payload: user
});
export const LoginFailure = (error) => ({
    type: "LOGIN_START", payload: error
});
