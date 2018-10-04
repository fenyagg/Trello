
export const USER_LOGIN = 'USER_LOGIN'
export const login = ({email = '', password = ''}) => {
  return {
    type: USER_LOGIN,
    payload: { email, password }
  }
}

export const USER_LOGOUT = 'USER_LOGOUT'
export const logout = () => {
  return {
    type: USER_LOGOUT
  }
}
