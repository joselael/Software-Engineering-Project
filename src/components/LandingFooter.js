import React, { Component } from 'react';
import '../css/landing.css'

class LandingFooter extends Component {
  render() {
    return (
      <div className="LandingFooter">
      <footer>
        <ul class="list-inline">
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a href="aboutus.html">About</a>
          </li>
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a href="signin.html">Sign In</a>
          </li>
          <li class="footer-menu-divider list-inline-item">&sdot;</li>
          <li class="list-inline-item">
            <a href="signup.html">Sign Up</a>
          </li>
        </ul>
        <p class="copyright text-muted small">Copyright &copy; Simple Turking System 2017. All Rights Reserved</p>
        </footer>
      </div>
    );
  }
}

export default LandingFooter;
