import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import { withRouter } from 'react-router-dom'
import Main from './Main'
import '../css/template.css'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <div>
        <NavigationBar />
        <Main />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  }
}

export default withRouter(connect(mapStateToProps)(App));
