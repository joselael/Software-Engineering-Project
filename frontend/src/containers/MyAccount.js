// file: containers/MyAccount.js

import React, { Component} from 'react';
import { SuperUserTab } from '../components/UserTabs'
import { loggedIn } from '../utils/Auth'
import { Redirect } from 'react-router-dom'
import '../css/account.css'

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: loggedIn()
    }
  }

  render() {

    if (this.state.fireRedirect) {
      return (
        <Redirect to="/" />
      )
    }

    return(
      <div className="MyAccount">
        <SuperUserTab />
      </div>
    );
  }
}

export default MyAccount;
