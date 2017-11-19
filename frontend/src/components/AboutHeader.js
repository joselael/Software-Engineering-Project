import React, { Component } from 'react';
import '../css/aboutus.css'

const pStyle = {
  padding: '12%'
};

class AboutHeader extends Component {
  render() {
    return (
      <div className="AboutHeader">
        <header class="intro-header">
          <div class="container">
            <div class="intro-message" style={pStyle}>
              <h1>About Us</h1>
              <h3>We are CCNY computer science students</h3>
            </div>
          </div>
        </header>

      </div>
    );
  }
}

class AboutBody extends Component {
  render() {
    return (
      <div className="AboutBody">
        <section class="content-section-a">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 ml-auto">
                
                <h2 class="section-heading">Gina DiCarlo</h2>
                <p class="lead">dicarlo.g.m@gmail.com</p>
              </div>

              <div class="col-lg-5 mr-auto">
                <img src={require('../images/Gina.png')} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        <section class="content-section-a">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-5 ml-auto">
                        
                        <h2 class="section-heading">Maureen Hanna McLean</h2>
                        <p class="lead">Maureen.hannamclean@gmail.com</p>
                      </div>

                      <div class="col-lg-5 mr-auto">
                        <img src={require('../images/Maureen.png')} style={{"height" : "70%"}}/>
                      </div>
                    </div>

                  </div>
                </section>

        <section class="content-section-a">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 ml-auto">
                
                <h2 class="section-heading">Jose Laël Louis</h2>
                <p class="lead"> jlouis000@citymail.cuny.edu</p>
              </div>

              <div class="col-lg-5 mr-auto">
                <img src={require('../images/Jose.png')} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        <section class="content-section-a">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 ml-auto">
                
                <h2 class="section-heading">Yong Su Lee</h2>
                <p class="lead">dkrcjs7521@gmail.com</p>
              </div>

              <div class="col-lg-5 mr-auto">
                <img src={require('../images/Yong.png')} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        <section class="content-section-a">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 ml-auto">
                
                <h2 class="section-heading">Yuan Zhou</h2>
                <p class="lead">yuanzhou719@gmail.com</p>
              </div>

              <div class="col-lg-5 mr-auto">
                <img src={require('../images/Yuan.png')} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        


      </div>

    );
  }
}

export {
AboutHeader,
AboutBody
}
