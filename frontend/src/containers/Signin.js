import React, { Component } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Redirect } from 'react-router-dom'
import { login, loggedIn } from '../utils/Auth' 
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
    login(Username, Password)

    if (loggedIn) {
      this.setState({
        fireRedirect:true
      })
    }

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
          <FormGroup>
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
          <FormGroup>
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
            color="primary"
            block
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