import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "./types";

export const login = ({ email = '', password = '' }) => {
  return {
    type: USER_LOGIN,
    payload: { email, password }
  }
};

export const logout = () => {
  return {
    type: USER_LOGOUT
  }
};

export const register = ({ email = '', password = '' }) => {
  return {
    type: USER_REGISTER,
    payload: { email, password }
  }
};
