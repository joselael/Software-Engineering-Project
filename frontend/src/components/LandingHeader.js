import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import '../css/landing.css'

class LandingHeader extends Component {

  render() {
    return (
      <div className="LandingHeader">
        <header className="intro-header">
          <div className="container">
            <div className="intro-message">
              <h1>Simplified coding Turk system</h1>
              <h3>Start a project today</h3>
              <hr/>
              <h2>
                <Button color='success'size='lg' to="/signup" tag={RRNavLink}> Sign Up </Button>
              </h2>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default LandingHeader;
