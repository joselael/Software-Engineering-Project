import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Image1 from '../images/project-example1.jpg'
import Image2 from '../images/project-example2.png'
import Image3 from '../images/project-example3.jpg'

var styles = {
  backgroundColor:'grey',
  justifyContent: 'center',
  alignItems: 'center',
};

const pStyle = {
  margin: "0 auto"
}

class LandingCarousel extends Component {
  render() {

    const items = [
      {
        src: Image1,
        altText: '',
        caption: ''
      },
      {
        src: Image2,
        altText: '',
        caption: ''
      },
      {
        src: Image3,
        altText: '',
        caption: ''
      }
    ];
    return(
      <div>
      <div className="col-md-7" style={pStyle}>
        <div className="LandingCarousel" style={styles}>
          <UncontrolledCarousel items={items} />
        </div>
        </div>
      </div>
    )
  }
}

export default LandingCarousel;
