import React, { Component } from 'react';
import { FormGroup, Button, Label, Input, InputGroupAddon, InputGroup } from 'reactstrap'
import { register } from '../utils/Users'
import { Redirect } from 'react-router-dom'
import '../css/signup.css'

class Signupbody extends Component {
  constructor(props){
    super(props);
    this.state={
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      passwordconfirmation: '',
      usertype: '',
      money: 0,
      fireRedirect: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value}); //this requires each to have a name when used
  }

  onSubmit(e){
    if (this.state.password === this.state.passwordconfirmation){
      if (this.state.username.length < 2 || this.state.firstname.length < 2 ||
      this.state.lastname.length < 2 || this.state.email.length < 2 ||
      this.state.usertype === '') {
        e.preventDefault();
        alert("Wrong credentials")
      } else {
        console.log(this.state);
        e.preventDefault();
        //after checking that the passwords are equal, this is where we get put the requests
        register(this.state.username, this.state.password, this.state.firstname,
        this.state.lastname, this.state.usertype, this.state.email, this.state.money)
        this.setState({
          fireRedirect: true
        })
      }
    }else{
      e.preventDefault()
      alert("Passwords do not match!")
    }
  }

  render() {

    if (this.state.fireRedirect) {
      return(
        <Redirect to="/" />
      )
    }

    return (
      <div className="Signup">
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label> First Name</Label>
            <input value={this.state.firstname} onChange={this.onChange} type="text" name="firstname" placeholder= "First name" className="form-control"/>
          </FormGroup>

          <FormGroup>
            <Label> Last Name</Label>
            <input value={this.state.lastname} onChange={this.onChange} type="text" name="lastname" placeholder= "Last name" className="form-control"/>
          </FormGroup>

          <FormGroup>
            <Label> Email</Label>
            <input value={this.state.email} onChange={this.onChange} type="email" name="email" placeholder= "Email" className="form-control"/>
          </FormGroup>
          <FormGroup>
            <Label> User type</Label>
            <select value={this.state.usertype} onChange={this.onChange} type="text" name="usertype" className="form-control">
              <option value="" disabled> Choose your user type </option>
              <option value="developer"> Developer </option>
              <option value="client"> Client </option>
            </select>
          </FormGroup>

          <FormGroup>
            <label className="control-label"> Username</label>
            <input value={this.state.username} onChange={this.onChange} type="text" name="username" placeholder= "Create a username" className="form-control"/>
          </FormGroup>

          <FormGroup>
            <label className="control-label"> Password</label>
            <input value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder= "password" className="form-control"/>
          </FormGroup>

          <FormGroup>
            <Label>
              Confirm password
            </Label>
            <input value={this.state.passwordconfirmation} onChange={this.onChange} type="password" name="passwordconfirmation" placeholder= "Confirm password" className="form-control"/>
          </FormGroup>

          <FormGroup>
            <Label>
              Money Amount
            </Label>
            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <Input
                value={this.state.money}
                onChange={this.onChange}
                type="money"
                name="money"
                placeholder="GIVE ME MONEY"
              />
            </InputGroup>
          </FormGroup>

            <Button
              type="submit"
              color="primary"
              size="lg"
            >
              Sign up
            </Button>
        </form>
      </div>
    );
  }
}

export default Signupbody;
