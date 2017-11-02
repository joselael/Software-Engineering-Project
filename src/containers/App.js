import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import LandingHeader from '../components/LandingHeader'
import LandingFooter from '../components/LandingFooter'
import '../css/template.css'

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
      </div>
    );
  }
}

export default App;
