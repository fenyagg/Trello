import React from 'react'
import configureStore from 'redux-mock-store'
import AuthForm from './index'
import { login } from '../../../store/user/actions'
import { initialUserStore } from '../../../store/user/reducers'

const mockStore = configureStore()

describe('Auth form', () => {
  let store
  let wrapper
  let emailInput
  let passwordInput
  beforeEach(() => {
    store = mockStore(initialUserStore)
    wrapper = mount(<AuthForm store={store}/>)

    emailInput = wrapper.find('[data-field="email"]').find('input')
    passwordInput = wrapper.find('[data-field="password"]').find('input')
  })
  afterEach(() => {
    store.clearActions()
  })

  it('should have email field', () => {
    expect(emailInput).toHaveLength(1)
  })
  it('should have password field', () => {
    expect(passwordInput).toHaveLength(1)
  })

  describe('when change input', () => {
    it('should save fields data', () => {
      const fields = wrapper.childAt(0).instance().fields
      emailInput.getDOMNode().value = 'test@email.ru'
      passwordInput.getDOMNode().value = 'password'

      emailInput.simulate('input')
      passwordInput.simulate('input')

      expect(fields.email.value).toEqual('test@email.ru')
      expect(fields.password.value).toEqual('password')
    })
  })
  describe('when submit', () => {
    it('should not call actions with no data', function () {
      wrapper.find('form').simulate('submit', {
        preventDefault: () => { return true }
      })
      expect(store.getActions()).toHaveLength(0)
    })
    it('should call USER_LOGIN action when email and password are filled', () => {
      const inputData = {
        email: 'test@email.ru',
        password: 'password'
      }
      emailInput.getDOMNode().value = inputData.email
      passwordInput.getDOMNode().value = inputData.password

      emailInput.simulate('input')
      passwordInput.simulate('input')

      wrapper.find('form').simulate('submit', {
        preventDefault: () => { return true }
      })

      const loginAction = login({ email: inputData.email, password: inputData.password })
      expect(store.getActions()).toEqual([loginAction])
    })
  })
})
