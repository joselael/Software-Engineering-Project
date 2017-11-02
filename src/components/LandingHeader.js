import React, { Component } from 'react';
import '../css/landing.css'

class LandingHeader extends Component {
  render() {
    return (
      <div className="LandingHeader">
        <header class="intro-header">
          <div class="container">
            <div class="intro-message">
              <h1>Simplified coding Turk system</h1>
              <h3>Start a project today</h3>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default LandingHeader;
