import React, { Component } from 'react';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import '../css/landing.css'

class LandingCarousel extends Component {
  constructor(props) {
      super(props);
      this.state={}
  }
  onSelect= (active,direction)=>{
      console.log(`active=${active} && direction=${direction}`);
  }
  slideNext=()=>{
    this.slider.slideNext();
  }
  slidePrev=()=>{
    this.slider.slidePrev();
  }
  goToSlide=()=>{
    this.slider.goToSlide(4);
  }
  _changeIcon=()=>{
    let {leftIcon,rightIcon}=this.state;
    if(leftIcon && rightIcon){
      this.setState({
        leftIcon:undefined,
        rightIcon:undefined
      });
    }
    else{
      this.setState({
        leftIcon:<span className="glyphicon glyphicon-glass"></span>,
        rightIcon:<span className="glyphicon glyphicon-music"></span>
      });
    }
  }
  render() {
    let {leftIcon,rightIcon}=this.state;
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <React_Bootstrap_Carousel
              animation={true}
              slideshowSpeed={7000}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onSelect={this.onSelect}
              ref={r=>this.slider=r}
              className="carousel-fade"
            >
              <div style={{height:400}}>
                <img
                  style={{width:"100%",height:"100%"}}
                  src="https://www.w3schools.com/bootstrap/la.jpg"
                />
                <div className="carousel-caption">
                  Image
                </div>
              </div>
              <div style={{height:400,width:"100%",backgroundColor:"aqua"}}>
                <video className="carousel-center" controls style={{width:"75%"}} height="250">
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                </video>
                <div className="carousel-caption">
                  Video
                </div>
              </div>
              <div style={{height:400,width:"100%",backgroundColor:"lightpink"}}>
                <div className="carousel-center">
                  center Text
                </div>
                <div className="carousel-caption">
                  Text
                </div>
              </div>
              <div style={{height:400,width:"100%",backgroundColor:"lightblue"}}>
                <span>
                  text
                </span>
                <div className="carousel-caption">
                  Text
                </div>
              </div>
              <div style={{height:400,width:"100%",backgroundColor:"lightblue"}}>
                <div className="carousel-center">
                  <iframe
                    style={{width:500}}
                    height="250"
                    src="https://www.youtube.com/embed/MhkGQAoc7bc?showinfo=0"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <div className="carousel-caption">
                  Youtube
                </div>
              </div>
            </React_Bootstrap_Carousel>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingCarousel;
