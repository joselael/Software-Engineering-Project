import React, {Component} from 'react'
import LandingFooter from '../components/LandingFooter'
import {SigninHeader, SigninBody} from '../components/SigninComp'

class Signin extends Component {
  render() {
    return (
        <div>
          <SigninHeader />
          <SigninBody />
          <LandingFooter />
        </div>
    );
  }
}

export default Signin;