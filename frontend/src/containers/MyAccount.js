// file: containers/MyAccount.js

import React, { Component} from 'react';
import { AdminTab } from '../components/UserTabs/AdminTab'
import { ClientTab } from '../components/UserTabs/ClientTab'
import { DeveloperTab } from '../components/UserTabs/DeveloperTab'
import { loggedIn } from '../utils/Auth'
import { Redirect } from 'react-router-dom'
import store from '../store'
import '../css/account.css'

class MyAccount extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    if (!loggedIn()) {
      return (
        <Redirect to="/" />
      )
      alert("You're not logged in!!!")
    }
    switch(store.getState().user.user_type) {
      case 'admin':
        return (
          <div className="accountsPage">
            <AdminTab />
          </div>
        )
      case 'client':
        return (
          <div className="accountsPage">
            <ClientTab />
          </div>
        )
      case 'developer':
        return (
          <div className="accountsPage">
            <DeveloperTab />
          </div>
        )
      default:
        alert("Login first!!")
        return (
          <Redirect to="/" />
        )
    }
  }
}

export default MyAccount;
