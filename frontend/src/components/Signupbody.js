import React, { Component } from 'react';
import '../css/aboutus.css'

const pStyle = {
  padding: '12%'
};

class Signupheader extends Component {
  render() {
    return (
      <div className="Signupheader">
        <header class="intro-header">
          <div class="container">
            <div class="intro-message" style={pStyle}>
              <h1>Sign up</h1>
              <h3>Start Creating today!</h3>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

class Signupbody extends Component {
  render() {
    return (
      <div class="form-group">
        <label for="name" class="cols-sm-2 control-label">Your Name</label>
        <div class="cols-sm-10">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
            <input type="text" class="form-control" name="name" id="name" placeholder="Enter your Name" />
          </div>
        </div>
      </div>
    );
  }
}

export {
Signupheader,
Signupbody
}
