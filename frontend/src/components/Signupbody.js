import React, { Component } from 'react';
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
      linkedinURL: '',
      githubURL: '',
      usertype: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value}); //this requires each to have a name when used
    console.log(e.target.value);
  }

  onSubmit(e){
    console.log(this.state);
    e.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1> Start creating today! </h1>
        <div className="form-group">
          <label className="control-label"> First Name</label>
          <input value={this.state.firstname} onChange={this.onChange} type="text" name="firstname" placeholder= "First name" className="form-control"/>
        </div>

        <div className="form-group">
          <label className="control-label"> Last Name</label>
          <input value={this.state.lastname} onChange={this.onChange} type="text" name="lastname" placeholder= "Last name" className="form-control"/>
        </div>

        <div className="form-group">
          <label className="control-label"> Email</label>
          <input value={this.state.email} onChange={this.onChange} type="email" name="email" placeholder= "Email" className="form-control"/>
        </div>

        <div className="form-group">
          <label className="control-label"> LinkedIn Link</label>
          <input value={this.state.linkedinURL} onChange={this.onChange} type="url" name="linkedinURL" placeholder= "LinkedIn link" className="form-control"/>
        </div>

        <div className="form-group">
          <label className="control-label"> Github Link</label>
          <input value={this.state.githubURL} onChange={this.onChange} type="url" name="githubURL" placeholder= "Github link" className="form-control"/>
        </div>


        <div className="form-group">
          <label className="control-label"> User type</label>
          <select value={this.state.usertype} onChange={this.onChange} type="text" name="usertype" className="form-control">
            <option value="" disabled> Choose your user type </option>
            <option value="developer"> Developer </option>
            <option value="client"> Client </option>

          </select>
        </div>


        <div className="form-group">
          <label className="control-label"> Username</label>
          <input value={this.state.username} onChange={this.onChange} type="text" name="username" placeholder= "Create a username" className="form-control"/>
        </div>

        <div className="form-group">
          <label className="control-label"> Password</label>
          <input value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder= "password" className="form-control"/>
        </div>

        <div className="form-group">
          <label className="control-label"> Confirm password</label>
          <input value={this.state.passwordconfirmation} onChange={this.onChange} type="password" name="passwordconfirmation" placeholder= "Confirm password" className="form-control"/>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">
          Sign up
          </button>
        </div>
      </form>
    );
  }
}

export default Signupbody;
