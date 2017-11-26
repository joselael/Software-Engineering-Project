// file: containers/MyAccount.js

import React, { Component} from 'react';
import {SuperUserTab} from '../components/UserTabs'
import '../css/account.css'

class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: "SU"
    }
  }

  render() {
    return(
      <div className="MyAccount">
        <SuperUserTab />
      </div>
    );
  }
}

export default MyAccount;
