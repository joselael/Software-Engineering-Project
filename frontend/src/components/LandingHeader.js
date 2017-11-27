import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import { loggedIn } from '../utils/Auth'
import store from '../store'
import '../css/landing.css'

class LandingHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      first_name: store.getState().user.first_name,
      last_name: store.getState().user.last_name
    }
  }

  render() {

    const isLoggedIn = loggedIn()

    console.log("rendering home page")
    
    return (
      <div className="LandingHeader">
        <header className="intro-header">
          <div className="container">
            <div className="intro-message">
              {isLoggedIn ? (
                <div>
                <h1>Welcome back!!!</h1> 
                <h3>{store.getState().user.first_name} {store.getState().user.last_name}</h3>
                </div>                
              ) : (
                <div>
                  <h1>Simplified coding Turk system</h1>
                  <h3>Start a project today</h3>
                  <Button color='success'size='lg' to="/signup" tag={RRNavLink}> 
                    Sign Up 
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default LandingHeader;
