import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, Collapse, NavDropdown} from "react-bootstrap";
import { loggedIn, logout } from '../utils/Auth';
import '../css/nav.css';
import Store from '../Store';
import axios from 'axios';

class NavigationBar extends Component { 

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NavigationBar">
        <Navbar className="navbar-expand-lg navbar-light bg-light fixed-top">
          <NavbarBrand href="/">Simple Coding Turkish System</NavbarBrand>
              {loggedIn ? (
                <Nav pullRight>
                    <NavItem>
                      <NavLink to='/myaccount'>My Account</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to='/'>Home</NavLink>
                    </NavItem>
                    <NavItem onSelect={logout}>
                      Logout
                    </NavItem>
                </Nav>
              ) : (
                <Nav className="ml-auto navbar-nav" id="navLinks">
                  <NavItem>
                    <NavLink to='/'>Home </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/about'>About </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/signin'>Sign In </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/signup'>Sign Up </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/publicsearch'>Search </NavLink>
                  </NavItem>
                </Nav>
              )}
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
