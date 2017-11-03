import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../css/nav.css'

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
              <ul className="nav navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link">
                    <NavLink to='/'>Home</NavLink>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <NavLink to='/about'>About</NavLink>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <NavLink to='/signin'>Sign In</NavLink>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <NavLink to='/signup'>Sign Up</NavLink>
                  </a>
                </li>
              </ul>
              <hr/>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavigationBar;
