import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../css/landing.css'

class LandingFooter extends Component {
  render() {
    return (
      <div className="LandingFooter">
      <footer>
        <ul class="list-inline">
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a>
            <Link to='/'>Home</Link>
            </a>
          </li>
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a>
            <Link to='/about'>About</Link>
            </a>
          </li>
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a>
              <Link to='signin'>Sign In</Link>
            </a>
          </li>
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a>
              <Link to='/signup'>Sign Up</Link>
            </a>
          </li>
        </ul>
        <p class="copyright text-muted small">Copyright &copy; Simple Turking System 2017. All Rights Reserved</p>
        </footer>
      </div>
    );
  }
}

export default LandingFooter;
