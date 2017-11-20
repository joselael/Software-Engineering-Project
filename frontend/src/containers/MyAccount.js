// file: containers/MyAccount.js

import React, { Component} from 'react';
import Store from "../Store"
import {getAccountByApiToken} from '../utils/Auth';

class MyAccount extends Component {

  constructor(props){
      super(props);
      this.state = {
        api_token : Store.getState().token,
        name: {
          first: "",
          last: ""
        },
        email: ""
      }

      this.getAccountByApiToken = getAccountByApiToken.bind(this);
      this.getAccountInfo = this.getAccountInfo.bind(this);
      this.getAccountInfo();
  }

  getAccountInfo(){
     const Api_token = this.state.api_token;
	 //call our axios promise, then retrieve the token from axios
	
     getAccountByApiToken(Api_token)
         .then( account => {
           this.setState({
             name : {
               first :account.first_name,
               last : account.last_name,
             },
             email: account.email
           });
         })
         .catch( (error) => { localStorage.setItem('api_token',"");
           this.setState({ api_token : ""});
           alert("Error " + error);
         });
 }
  render() {
    return(
      <div>
      <h1> {this.state.api_token}</h1>
      <b> {this.state.name.first + this.state.name.last}</b>
      </div>
    );
  }
}

export default MyAccount;
