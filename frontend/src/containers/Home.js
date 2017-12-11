import React, { Component } from 'react';
import LandingHeader from '../components/LandingHeader'
import LandingFooter from '../components/LandingFooter'
import LandingCarousel from '../components/LandingCarousel'
import LandingStatistics from '../components/LandingStatistics'

class Home extends Component {
	render() {
		return (
		  <div>
		    <LandingHeader />
				<LandingStatistics />
				<LandingCarousel />
		    <LandingFooter />
		  </div>
  		)
	}
}

export default Home
