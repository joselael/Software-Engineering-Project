import React, {Component} from 'react'
import Signupbody from '../components/Signupbody'
import Signupheader from '../components/Signupheader'

class Signup extends Component {
  render() {
    return (
      <div>
        <Signupheader />
        <Signupbody />
      </div>
    )
  }
}
export default Signup;
