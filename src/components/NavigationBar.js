import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom'


class NavigationBar extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <a className="navbar-brand">Simple Turking System</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="aboutus.html">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="signin.html">Sign In</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="signup.html">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
