export interface UserState {
    id: string,
    name: string,
    secondName: string,
    login: string,
    email: string,
    isAuthorized: boolean,
}

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REGISTER = 'USER_REGISTER';

interface UserLoginAction {
    type: typeof USER_LOGIN;
    payload: {
        email: string,
        isAuthorized: boolean,
    };
}
interface UserLogoutAction {
    type: typeof USER_LOGOUT;
}
interface UserRegisterAction {
    type: typeof USER_REGISTER;
    payload: {
        email: string,
        isAuthorized: boolean,
    };
}

export type UserActionTypes = UserLoginAction | UserLogoutAction | UserRegisterAction
