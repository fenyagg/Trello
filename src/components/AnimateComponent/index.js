import React from 'react'
import './style.css'

export default class AnimateComponent extends React.Component {

  renderTimeOutId = 0
  animationTimeOutId = 0
  STATUS_MOUNT_START = 0
  STATUS_MOUNT_END = 1
  STATUS_UNMOUNT_START = 2
  STATUS_UNMOUNT_END = 3
  classList = []

  constructor (props) {
    super(props)

    this.state = {
      shouldRender: this.props.isMounted,
      status: this.props.isMounted ? this.STATUS_MOUNT_START : this.STATUS_UNMOUNT_END,
      transition: 0
    }
    if (props.animation) {
      this.classList = {
        [this.STATUS_MOUNT_START]: `${props.animation}-mount-start`,
        [this.STATUS_MOUNT_END]: `${props.animation}-mount-end`,
        [this.STATUS_UNMOUNT_START]: `${props.animation}-unmount-start`,
        [this.STATUS_UNMOUNT_END]: `${props.animation}-unmount-end`,
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isMounted,
      mountDelay = 0,
      unmountDelay = 0
    } = this.props

    // no mount props changed
    if ( prevProps.isMounted === isMounted
        || isMounted && !mountDelay
        || !isMounted && !unmountDelay
    ) return

    if (this.renderTimeOutId) clearTimeout(this.renderTimeOutId)
    if (this.animationTimeOutId) clearTimeout(this.animationTimeOutId)

    if (isMounted) {
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
      ...props } = this.props
    const wrapperClass = `${className} ${this.classList[this.state.status]}`
    const wrapperStyle = { ...style, transitionDuration: this.state.transition/1000+'s'}

    return (
      this.state.shouldRender ?
      (
        <div style={wrapperStyle} className={wrapperClass} {...props}>
          {this.props.children}
        </div>
      ) : null
    )
  }
}
