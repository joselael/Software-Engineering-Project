import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom'
import { 
  Button, MenuItem, Nav, Navbar, 
  NavbarBrand, NavItem, Collapse, 
  NavDropdown, NavbarToggler, NavLink
} from "reactstrap";
import axios from 'axios';
import { loggedIn, logout } from '../utils/Auth'
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
    logout()
    alert("Signed out")
  }

  render() {
    const {navCollapsed} = this.state
    const isLoggedIn = loggedIn()
    return (
      <div className="NavigationBar">
        <Navbar className="navbar-light bg-light" light expand="md">
          <NavbarBrand to="/">Simple Coding Turkish System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {isLoggedIn ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to='/' tag={RRNavLink}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/myaccount' tag={RRNavLink}>
                  My Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/search' tag={RRNavLink}>
                  Search
                </NavLink>
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
                <NavLink to='/' tag={RRNavLink}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/about' tag={RRNavLink}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/search' tag={RRNavLink}>
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/signin' tag={RRNavLink}>
                  Sign In
                </NavLink>
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
