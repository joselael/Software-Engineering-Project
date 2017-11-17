import React, { Component } from 'react';
import '../css/aboutus.css'

const pStyle = {
    padding: '12%'
};

class LoginHeader extends Component {
  render() {
    return (
      <div classNameName="LoginHeader">
        <header className="intro-header">
          <div className="container">
            <div className="intro-message" style={pStyle}>
              <h1>About Us</h1>
              <h3>We are CCNY computer science students</h3>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default LoginHeader;