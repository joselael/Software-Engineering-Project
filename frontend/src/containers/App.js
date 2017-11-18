import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import Main from './Main'
import '../css/template.css'

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

export default App;
