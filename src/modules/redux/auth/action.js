export const LOGIN_PROCESS = 'LOGIN_PROCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const FORGOT_PASSWORD_ACTION = 'FORGOT_PASSWORD_ACTION';
export const RESET_PASSWORD_ACTION = 'RESET_PASSWORD_ACTION';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginProcess = () => ({
    type: LOGIN_PROCESS
});

export const loginSuccess = (tokenPayload) => ({
    type: LOGIN_SUCCESS,
    payload: tokenPayload
});

export const loginFailed = (errorMessage) => ({
    type: LOGIN_FAILED,
    payload: errorMessage
});

export const forgotPasswordAction = (loading) => ({
    type: FORGOT_PASSWORD_ACTION,
    payload: loading
});

export const resetPasswordAction = (loading) => ({
    type: RESET_PASSWORD_ACTION,
    payload: loading
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});
