import React, { Component } from 'react';
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
 } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import { loggedIn } from '../utils/Auth'
import FirstLoginModal from './Users/FirstLoginModal'
import store from '../store'
import '../css/landing.css'

class LandingHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: store.getState().user.first_name,
      last_name: store.getState().user.last_name,
      modal: store.getState().user.first_login
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
      </div>
    );
  }
}

export default LandingHeader;
