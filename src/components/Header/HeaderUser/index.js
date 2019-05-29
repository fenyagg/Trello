import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import { logout } from '../../../store/user/actions'
import PropTypes from 'prop-types'

class HeaderUser extends Component {
  render () {
    const { name, secondName, logoutFn } = this.props
    return (
      <div className="header-user">
        <a href="#0" className="header-user__avatar"
          style={{ 'backgroundImage': 'url("/img/stalone.jpg")' }}
          title={name + ' ' + secondName}> </a>

        <a href="#0" className="header-user__exit"
          onClick={e => {
            e.preventDefault()
            logoutFn()
          }}>Выход</a>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    name: store.user.name,
    secondName: store.user.secondName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutFn: () => dispatch(logout())
  }
}

HeaderUser.propTypes = {
  name: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  logoutFn: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUser)
