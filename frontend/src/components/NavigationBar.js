import React, { Component } from 'react';
import { Button, NavLink, MenuItem, Nav, Navbar, NavbarBrand, NavItem, Collapse, NavDropdown, NavbarToggler } from "reactstrap";
import axios from 'axios';
import { loggedIn } from '../utils/Auth'
import store from '../store'
import { setToken } from '../actions/index';

class NavigationBar extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.signout = this.signout.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  signout(e) {
    e.preventDefault();
    store.dispatch(setToken(null))
    alert("Signed out")
  }

  render() {
    const {navCollapsed} = this.state
    const isLoggedIn = loggedIn()
    return (
      <div className="NavigationBar">
        <Navbar className="navbar-light bg-light" light expand="md">
          <NavbarBrand href="/">Simple Coding Turkish System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {isLoggedIn ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/myaccount'>My Account</NavLink>
              </NavItem>
              <NavItem>
                <Button onClick={this.signout}>
                  Sign Out
                </Button>
              </NavItem>
            </Nav> 
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/about'>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/signin'>Sign In</NavLink>
              </NavItem>
            </Nav>
          )}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
