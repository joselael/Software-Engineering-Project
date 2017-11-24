import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem, Nav, Navbar, NavbarBrand, NavItem, Collapse, NavDropdown, NavbarToggler } from "reactstrap";
//import '../css/nav.css';
import axios from 'axios';
import {logout} from '../utils/Auth'

class NavigationBar extends Component { 

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.logout = logout.bind(this)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {navCollapsed} = this.state
    return (
      <div className="NavigationBar">
        <Navbar className="navbar-light bg-light" light expand="md">
          <NavbarBrand href="/">Simple Coding Turkish System</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem eventKey={1}>
                  <NavLink to='/'>Home</NavLink>
                </NavItem>
                <NavItem eventKey={2}>
                  <NavLink to='/myaccount'>My Account</NavLink>
                </NavItem>
                <NavItem eventKey={3}>
                  Logout
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
