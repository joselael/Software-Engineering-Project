import React, { Component } from 'react';
import '../css/aboutus.css'

const pStyle = {
  padding: '12%'
};

class AboutHeader extends Component {
  render() {
    return (
      <div classNameName="AboutHeader">
        <header className="intro-header">
          <div className="container">
            <div className="intro-message" style={pStyle}>
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
      <div classNameName="AboutBody">
        <section className="content-section-a">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 ml-auto">
                
                <h2 className="section-heading">Gina DiCarlo</h2>
                <p className="lead">dicarlo.g.m@gmail.com</p>
              </div>

              <div className="col-lg-5 mr-auto">
                <img src={require('../images/Gina.png')} alt={"Not working"} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        <section className="content-section-a">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-5 ml-auto">
                        
                        <h2 className="section-heading">Maureen Hanna McLean</h2>
                        <p className="lead">Maureen.hannamclean@gmail.com</p>
                      </div>

                      <div className="col-lg-5 mr-auto">
                        <img src={require('../images/Maureen.png')} alt={"Not working"}style={{"height" : "70%"}}/>
                      </div>
                    </div>

                  </div>
                </section>

        <section className="content-section-a">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 ml-auto">
                
                <h2 className="section-heading">Jose Laël Louis</h2>
                <p className="lead"> jlouis000@citymail.cuny.edu</p>
              </div>

              <div className="col-lg-5 mr-auto">
                <img src={require('../images/Jose.png')} alt={"Not working"} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        <section className="content-section-a">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 ml-auto">
                
                <h2 className="section-heading">Yong Su Lee</h2>
                <p className="lead">dkrcjs7521@gmail.com</p>
              </div>

              <div className="col-lg-5 mr-auto">
                <img src={require('../images/Yong.png')} alt={"Not working"} style={{"height" : "70%"}}/>
              </div>
            </div>

          </div>
        </section>

        <section className="content-section-a">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 ml-auto">
                
                <h2 className="section-heading">Yuan Zhou</h2>
                <p className="lead">yuanzhou719@gmail.com</p>
              </div>

              <div className="col-lg-5 mr-auto">
                <img src={require('../images/Yuan.png')} alt={"Not working"} style={{"height" : "70%"}}/>
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
