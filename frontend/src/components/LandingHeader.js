import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import { loggedIn } from '../utils/Auth'
import store from '../store'
import '../css/landing.css'

class LandingHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: store.getState().user.first_name,
      last_name: store.getState().user.last_name,
      first_login: store.getState().user.first_login
    }
  }

  render() {

    const isLoggedIn = loggedIn()

    return (
        <div>
              {isLoggedIn ? (
                <div className="LandingHeader">

                <Modal isOpen={this.first_login} toggle={this.toggle} className={this.props.className}>
  <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
  <ModalBody>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
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
