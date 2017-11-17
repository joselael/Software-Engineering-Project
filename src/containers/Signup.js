import React, {Component} from 'react'
import LandingFooter from '../components/LandingFooter'
import {Signupheader, Signupbody} from '../components/Signupbody'

class Signup extends Component {
  render() {
    return (
	  <div>
	  	<Signupheader />
	  	<Signupbody />
      <LandingFooter />
      </div>
    )
  }
}
export default Signup;
