import React, { Component } from 'react';
import '../css/aboutus.css'
import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const pStyle = {
  padding: '12%'
};

class SigninHeader extends Component {
  render() {
    return (
      <div className="SigninHeader">
        <header className="intro-header">
          <div className="container">
            <div className="intro-message" style={pStyle}>
              <h1>Sign In</h1>
              <h3>Sign In To Start Creating today!</h3>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

class SigninBody extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

export {SigninHeader, SigninBody}