// file: containers/MyAccount.js

import React, { Component} from 'react';
import { SuperUserTab } from '../components/UserTabs'
import { loggedIn, getUser } from '../utils/Auth'
import { Redirect } from 'react-router-dom'
import store from '../store'
import '../css/account.css'

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: !loggedIn(),
    }
    this.getUser = getUser.bind(this)
  }

  render() {

    if (this.state.fireRedirect) {
      return (
        <Redirect to="/" />
      )
    }
    switch(store.getState().user.user_type) {
      case 'SU':
        return (
          <SuperUserTab />
        )
      default:
        return (
          <Redirect to="/" />
        )
    }
  }
}

export default MyAccount;
