import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import Main from './Main'
import '../css/template.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      api_token : null
    }
  }

  render() {
    return (
      <div>
        <NavigationBar/>
        <Main />
      </div>
    )
  }
}

export default App;
