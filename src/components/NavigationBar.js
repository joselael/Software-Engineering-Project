import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import {Nav, Navbar, NavbarBrand, NavItem, Collapse} from "react-bootstrap";
import '../css/nav.css'

class NavigationBar extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <Navbar className="navbar-expand-lg navbar-light bg-light fixed-top">
          <NavbarBrand href="/">Simple Coding Turkish System</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signin/">Sign In</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
