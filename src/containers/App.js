import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import LandingHeader from '../components/LandingHeader'
import LandingFooter from '../components/LandingFooter'
import '../css/template.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavigationBar />
          <LandingHeader />
          <LandingFooter />
      </div>
    );
  }
}

export default App;
