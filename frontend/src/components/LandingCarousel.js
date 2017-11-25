import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
//import '../css/carousel.css'
import Image from '../images/Yong.png'

var styles = {
  backgroundColor:'grey',
  justifyContent: 'center',
  alignItems: 'center',
};

class LandingCarousel extends Component {
  render() {

    const items = [
      {
        src: Image,
        altText: 'Slide 1',
        caption: 'Slide 1'
      },
      {
        src: Image,
        altText: 'Slide 2',
        caption: 'Slide 2'
      },
      {
        src: Image,
        altText: 'Slide 3',
        caption: 'Slide 3'
      }
    ];
    return(
      <div className="LandingCarousel" style={styles}>
        <UncontrolledCarousel items={items}/>
      </div>
    )
  }
}

export default LandingCarousel;
