import React, { Component } from 'react';
import LandingHeader from '../components/LandingHeader'
import LandingFooter from '../components/LandingFooter'
import LandingCarousel from '../components/LandingCarousel'

class Home extends Component {
	render() {
		return (
		  <div>
		    <LandingHeader />
				{/*
				<LandingCarousel />
				*/}
		    <LandingFooter />
		  </div>
  		)
	}
}

export default Home
