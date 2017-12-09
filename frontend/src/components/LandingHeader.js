import React, { Component } from 'react';
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
  Alert
 } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import { loggedIn } from '../utils/Auth'
import FirstLoginModal from './Users/FirstLoginModal'
import store from '../store'
import '../css/landing.css'
import BarChart from 'react-bar-chart'

class LandingHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: store.getState().user.first_name,
      last_name: store.getState().user.last_name,
      modal: store.getState().user.first_login,
      visible: true
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  onDismiss() {
    this.setState({ visible: false });
  }
  render() {

    const isLoggedIn = loggedIn()

    return (
      <div>
        {isLoggedIn ? (
          <div>
            {store.getState().user.warnings === 1 ?
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              You have been warned {store.getState().user.warnings} time
            </Alert> : null
            }
            {store.getState().user.warnings === 2 ?
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              This is your final warning
            </Alert> : null
            }
            <div className="LandingHeader">
              <header className="loggedin-intro-header">
                <div className="container">
                  <div className="loggedin-intro-message">
                    <div className="text-background">
                    <h1>Welcome back!</h1>
                    <h3>{store.getState().user.first_name}</h3>
                    </div>
                  </div>
                </div>
              </header>
              <FirstLoginModal />
            </div>
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
      </div>
    );
  }
}

export default LandingHeader;
