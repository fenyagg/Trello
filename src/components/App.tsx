import React from 'react'
import { connect } from 'react-redux'
// css
import './app.css'
// components
import AuthTabs from './AuthTabs'
import Desc from './Desc/index'
import Header from './Header'

interface Props {
  isAuthorized: boolean
}

class App extends React.Component<Props> {
  // drop fix https://stackoverflow.com/questions/50230048/react-ondrop-is-not-firing
  public onDragOver (e:React.SyntheticEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  public render () {
    const { isAuthorized } = this.props;

    return (
      <div className="trello"
        onDragOver={this.onDragOver} >

        <Header/>

        <div className="main-container">
          {!isAuthorized && <AuthTabs />}
          {isAuthorized && <Desc />}
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthorized: state.user.isAuthorized
  }
};

export default connect(mapStateToProps)(App)
