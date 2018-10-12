import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

class AnimateComponent extends React.Component {

  STATUS_MOUNT_START = 0
  STATUS_MOUNT_END = 1
  STATUS_UNMOUNT_START = 2
  STATUS_UNMOUNT_END = 3

  renderTimeOutId = 0
  animationTimeOutId = 0
  classList = []

  constructor (props) {
    super(props)

    this.state = {
      shouldRender: this.props.isMounted,
      status: this.props.isMounted ? this.STATUS_MOUNT_START : this.STATUS_UNMOUNT_END,
      transition: 0
    }
    const animationFunction = props.animation || 'default'
    this.classList = {
      [this.STATUS_MOUNT_START]: `${animationFunction}-mount-start`,
      [this.STATUS_MOUNT_END]: `${animationFunction}-mount-end`,
      [this.STATUS_UNMOUNT_START]: `${animationFunction}-unmount-start`,
      [this.STATUS_UNMOUNT_END]: `${animationFunction}-unmount-end`,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isMounted,
      mountDelay = 0,
      unmountDelay = 0
    } = this.props

    // no mount props changed
    if ( prevProps.isMounted === isMounted) return

    // clear timeout
    if (this.renderTimeOutId) clearTimeout(this.renderTimeOutId)
    if (this.animationTimeOutId) clearTimeout(this.animationTimeOutId)

    if (isMounted) {
      // start mount animation
      this.setState({
        shouldRender: true,
        status: this.STATUS_MOUNT_START,
        transition: 0
      })

      this.animationTimeOutId = setTimeout(
        () => this.setState({
          status: this.STATUS_MOUNT_END,
          transition: mountDelay
        })
      )
    } else {
      // start unmount animation
      this.setState({
        shouldRender: true,
        status: this.STATUS_UNMOUNT_START,
        transition: 0
      })

      this.animationTimeOutId = setTimeout(
        () => this.setState({
          status: this.STATUS_UNMOUNT_END,
          transition: unmountDelay
        })
      )
      this.renderTimeOutId = setTimeout(
        () => {
          this.setState({shouldRender: false})
        },
        unmountDelay
      )
    }
  }

  render() {
    const {
      isMounted,
      mountDelay,
      unmountDelay,
      style = {},
      className = '',
      children,
      ...props } = this.props
    const wrapperClass = `${className} animate-component-container ${this.classList[this.state.status]}`
    const wrapperStyle = { ...style, transitionDuration: this.state.transition/1000+'s'}

    return (
      this.state.shouldRender ?
      (
        <div style={wrapperStyle} className={wrapperClass} {...props}>
          {children}
        </div>
      ) : null
    )
  }
}

AnimateComponent.proptypes = {
  children: PropTypes.element.isRequired,
  isMounted: PropTypes.bool.isRequired,
  mountDelay: PropTypes.number,
  unmountDelay: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  animation: PropTypes.string,
  classList: PropTypes.object
}

export default AnimateComponent
