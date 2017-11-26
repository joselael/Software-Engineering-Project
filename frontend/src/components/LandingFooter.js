import React, { Component } from 'react';
import { NavLink } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import '../css/landing.css'

class LandingFooter extends Component {
  render() {
    return (
      <div className="LandingFooter">
      <footer>
        <ul className="list-inline">
          <li className="footer-menu-divider list-inline-item">&sdot;</li>
          <li className="list-inline-item">
              <NavLink to='/' tag={RRNavLink}>Home</NavLink>
          </li>
          <li className="footer-menu-divider list-inline-item">&sdot;</li>
          <li className="list-inline-item">
              <NavLink to='/about' tag={RRNavLink}>About</NavLink>
          </li>
          <li className="footer-menu-divider list-inline-item">&sdot;</li>
          <li className="list-inline-item">
              <NavLink to='signin' tag={RRNavLink}>Sign In</NavLink>
          </li>
          <li className="footer-menu-divider list-inline-item">&sdot;</li>
          <li className="list-inline-item">
              <NavLink to='/signup' tag={RRNavLink}>Sign Up</NavLink>
          </li>
        </ul>
        <p className="copyright text-muted small">Copyright &copy; Simple Turking System 2017. All Rights Reserved</p>
        </footer>
      </div>
    );
  }
}

export default LandingFooter;
