import React, {Component} from 'react'
import Signupbody from '../components/Signupbody'
import '../css/Signin.css';


class Signup extends Component {
  render() {
    return (
      <div>

        <div className="row">
  	     <div className="col-md-4 col-md-offset-4">
          <div>
            <Signupbody />
          </div>
         </div>
         </div>
      </div>
    )
  }
}
export default Signup;
