import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import '../css/carousel.css'

class LandingCarousel extends Component {
    render() {
        return (
            <div className="LandingCarousel">
                <Carousel
                    showThumbs={true}
                    showArrows={true}
                    showStatus={false}
                    dynamicHeight={true}
                    centerMode={true}
                    autoPlay={true}
                    stopOnHover={false}
                    infiniteLoop={true}
                    width={"900px"}>
                    <div>
                        <img src={require('../images/Gina.png')} />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={require('../images/Gina.png')} />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src={require('../images/Gina.png')} />
                        <p className="legend">Legend 3</p>
                    </div>
                    <div>
                        <img src={require('../images/Gina.png')} />
                        <p className="legend">Legend 4</p>
                    </div>
                    <div>
                        <img src={require('../images/Gina.png')} />
                        <p className="legend">Legend 5</p>
                    </div>
                    <div>
                        <img src={require('../images/Gina.png')} />
                        <p className="legend">Legend 6</p>
                    </div>
                </Carousel>
            </div>

        )
    }
}

export default LandingCarousel;
