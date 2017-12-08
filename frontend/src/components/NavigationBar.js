import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom'
import {
  Button,Nav, Navbar,
  NavbarBrand, NavItem, Collapse,
  NavbarToggler, NavLink, NavDropdown,
  Dropdown, DropdownItem, DropdownToggle, DropdownMenu
} from "reactstrap";
import { loggedIn, logout } from '../utils/Auth'

class NavigationBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.signout = this.signout.bind(this)
  }

  toggle = event => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleDropDown = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  signout(e) {
    e.preventDefault();
    logout()
  }

  render() {
    const isLoggedIn = loggedIn()
    return (
      <div className="NavigationBar">
        <Navbar className="navbar-light bg-light" light expand="md">
          <NavbarBrand to="/" tag={RRNavLink} style={{ fontFamily: 'OCR A Std, monospace', fontWeight: 'bold'}}>
            Cre-ators
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {isLoggedIn ? (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to='/myaccount' tag={RRNavLink}>
                  My Account
                </NavLink>
              </NavItem>
              <NavItem>
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                  <DropdownToggle nav caret>
                    Search
                  </DropdownToggle>
                  <DropdownMenu>
                    <NavLink to='/searchprojects' tag={RRNavLink} onClick={this.toggleDropDown}>
                      Projects
                    </NavLink>
                    <NavLink to='/searchusers' tag={RRNavLink} onClick={this.toggleDropDown}>
                      Users
                    </NavLink>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
                <Button
                  onClick={this.signout}
                  size="md"
                  color="info"
                >
                  Sign Out
                </Button>
              </NavItem>
            </Nav>
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to='/about' tag={RRNavLink}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                  <DropdownToggle nav caret>
                    Search
                  </DropdownToggle>
                  <DropdownMenu>
                    <NavLink to='/searchprojects' tag={RRNavLink} onClick={this.toggleDropDown}>
                      Projects
                    </NavLink>
                    <NavLink to='/searchusers' tag={RRNavLink} onClick={this.toggleDropDown}>
                      Users
                    </NavLink>
                  </DropdownMenu>
                </Dropdown>
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
