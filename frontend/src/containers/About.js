import React, {Component} from 'react'
import LandingFooter from '../components/LandingFooter'
import {AboutHeader, AboutBody} from '../components/AboutHeader'

class About extends Component {
  render() {
    return (
	  <div> 
	  	<AboutHeader />  
	  	<AboutBody />  
      <LandingFooter />
    </div>
    )
  }
}
export default About;
