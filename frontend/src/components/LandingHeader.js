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
import ProtestModal from './Users/ProtestModal'
import '../css/landing.css'
import BarChart from 'react-bar-chart'

class LandingHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: store.getState().user.first_name,
      last_name: store.getState().user.last_name,
      modal: store.getState().user.first_login,
      warnings: 0,
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

    var protestPrompt = ""
    if (this.state.warnings > 0) {
      protestPrompt = <ProtestModal />
    }

    console.log(protestPrompt)
    //Send protesting message to user if the warning is greater 0. Warning should be at 0 when they first login
    return (
      <div>
        {isLoggedIn ? (
          <div>
            {store.getState().user.warnings > 0 ?
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              You have been warned {store.getState().user.warnings} time(s). If you have two warnings this is the last time you can log on to Cre-ators.
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
