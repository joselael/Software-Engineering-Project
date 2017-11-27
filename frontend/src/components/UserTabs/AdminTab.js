import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, 
  NavLink, Button, Table,
  Row, Col, Media } from 'reactstrap';
import classnames from 'classnames';
import '../../css/usertab.css';
import { accounts } from '../../utils/Auth'
import store from '../../store'

export class AdminTab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      users: accounts()
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
            Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active : this.state.activeTab === '3'})}
              onClick={() => { this.toggle('3'); }}
            >
            Settings
            </NavLink>
          </NavItem>
        </Nav>
        <div className="activeTab">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <h4>Pending</h4>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </Table>
              </Row>
              <Row>
                <h4>Accepted</h4>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </Table>
              </Row>
              <Row>
                <h4>Black List</h4>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </Table>
              </Row>
            </TabPane>
            <TabPane tabId="2" className="Profile-Tab">
              <Row>
                <Col sm="6">
                  <h4>{store.getState().user.first_name} {store.getState().user.last_name}</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3" className="Setting-Tab">
              <Row>
                <Col sm="12">
                  <h4>I am setting tab</h4>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
