export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
    payload: userCredentials
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUUCESS",
    payload: user
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

export const Follow = (userId) =>({
    type: "FOLLOW",
    payload: userId,
})