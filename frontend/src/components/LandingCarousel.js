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
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center'
}


class LandingCarousel extends Component {
  render() {

    const items = [
      {
        src: Image1,
        styles: pStyle,
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
      <br/>
      <div style={{display: 'flex', justifyContent: 'center'}} className="row">
      <div className="col-md-7 col-md-offset-3">
        <div className="LandingCarousel" style={styles}>
          <UncontrolledCarousel items={items} />
        </div>
        </div>
      </div>
      </div>
    )
  }
}

export default LandingCarousel;
