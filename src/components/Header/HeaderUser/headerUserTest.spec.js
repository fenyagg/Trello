import HeaderUser from './index'
import React from 'react'

describe('auth form shown', function () {
  const props = {
    onExit: () => {}
  }
  it('should render auth form', function () {
    const authFormComponent = shallow(<HeaderUser {...props}/>)

    expect(authFormComponent.find('.header-user__exit').text()).toEqual('Выход')
  })
})
