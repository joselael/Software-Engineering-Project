import React, { Component } from 'react';
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col
 } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import { loggedIn } from '../utils/Auth'
import FirstLoginModal from './Users/FirstLoginModal'
import store from '../store'
import '../css/landing.css'
import BarChart from 'react-bar-chart'

const data = [
  {text: 'Developers', value: 5},
  {text: 'Clients', value: 3},
  {text: 'Projects', value: 1}
];
const margin = {top: 20, right: 20, bottom: 30, left: 40};

class LandingHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: store.getState().user.first_name,
      last_name: store.getState().user.last_name,
      modal: store.getState().user.first_login,
      width: 600
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {

    const isLoggedIn = loggedIn()

    return (
      <div>
        {isLoggedIn ? (
          <div className="LandingHeader">
            <header className="loggedin-intro-header">
              <div className="container">
                <div className="loggedin-intro-message">
                  <div className="text-background">
                  <h1>Welcome back!</h1>
                  <h3>{store.getState().user.first_name} {store.getState().user.last_name}</h3>
                  </div>
                </div>
              </div>
            </header>
            <FirstLoginModal />
          </div>
        ) : (
          <div className="LandingHeader">
            <header className="intro-header">
              <div className="container">
                <div className="intro-message">
                  <div>
                    <h1>Simplified coding Turk system</h1>
                    <h3>Start a project today</h3>
                    <Button color='success'size='lg' to="/signup" tag={RRNavLink}>
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            </header>
          </div>
        )}
        <Row>
        <br/>
          <Col sm="12" md={{offset: 3 }}>
            <div ref='root'>
                <div style={{width: '50%', fill:'#258e8e', stroke: 'grey'}}>
                    <BarChart ylabel='Statistics'
                      width={this.state.width}
                      height={500}
                      margin={margin}
                      data={data}/>
                </div>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

export default LandingHeader;
