import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect, Link } from 'react-router-dom'
import { login } from '../utils/Auth' 
import { setToken } from '../actions'
import store from '../store'
import '../css/Signin.css';
import { SET_TOKEN } from "../actions/types";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fireRedirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.login = login.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {

    const Username = this.state.username;
    const Password = this.state.password;

    //Call axios login promise
    this.login(Username, Password)
      .then(
        api_token => {
          store.dispatch(setToken(api_token))
          alert("You're logged in!")
          this.setState({
            fireRedirect: true
          })
        }
      )
      .catch( (error) => 
        {
        localStorage.setItem('api_token', "")
        localStorage.setItem('loggedIn', false)
        this.setState({api_token: ""})
        alert("Error " + error); 
      }
    );

    event.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state.fireRedirect

    return (
      <div className="Signin">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Signin
          </Button>
        </form>
        {
          fireRedirect && (
            <Redirect to={from || '/'}/>
          )
        }
      </div>
    )
  }
}

export default Signin;