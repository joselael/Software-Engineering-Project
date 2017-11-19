import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, Collapse} from "react-bootstrap";
import { login, loggedIn } from '../utils/Auth';
import '../css/nav.css';
import Store from '../Store';

class NavigationBar extends Component { 
  render() {

    let userMessage;
    if (loggedIn) {
      userMessage = (
        <span>
          <h2>Yong</h2>
          <p>You can visit settings to reset your password</p>
        </span>
      )
    } else {
      userMessage = (
        <h2>Hey man! Sign in to see this section</h2>
      )
    }

    return (
      <div className="NavigationBar">
        <Navbar className="navbar-expand-lg navbar-light bg-light fixed-top">
          <NavbarBrand href="/">Simple Coding Turkish System</NavbarBrand>
            <Nav className="ml-auto navbar-nav" id="navLinks">
              <NavItem>
                <NavLink to='/'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/about'>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/signin'>Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/signup'>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/publicsearch'>Search</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
