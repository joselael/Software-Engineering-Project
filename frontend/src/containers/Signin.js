import React, { Component } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Redirect } from 'react-router-dom'
import { login } from '../utils/Auth' 
import { setToken } from '../actions'
import store from '../store'
import '../css/Signin.css';

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
      [event.target.name]: event.target.value
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
    if (this.state.fireRedirect) {
      return (
        <Redirect to='/'/>
      )
    }

    return (
      <div className="Signin">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <Label>Username</Label>
            <Input
              autoFocus
              type="username"
              name="username"
              placeholder="Username"
              onChange={this.handleChange.bind(this)}
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
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
      </div>
    )
  }
}

export default Signin;