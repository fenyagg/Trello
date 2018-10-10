import {USER_LOGIN, USER_LOGOUT} from './../actions/user';

const initialClearStore = {
  id: '',
  name: '',
  secondName: '',
  login: '',
  email: '',
  isAuthorized: false
}

const initialStore = {
  id: '1',
  name: 'Сильвестр',
  secondName: 'Сталоне',
  email: 'test@test.ru',
  login: 'test',
  isAuthorized: true
}

export default function user( store = initialStore, action) {
  switch (action.type){
    case USER_LOGIN:
      return {
        ...store,
        email: action.payload.email,
        isAuthorized: true
      }
    case USER_LOGOUT:
      return {
        ...initialClearStore
      }
    default:
      return store;
  }
}
