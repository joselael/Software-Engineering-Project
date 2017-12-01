import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, 
  NavLink, Button, Table,
  Row, Col, Media } from 'reactstrap';
import '../../css/usertab.css';
import { accounts } from '../../utils/Auth'
import store from '../../store'
import classnames from 'classnames'
import ProfileTab from './GeneralTab/ProfileTab'
import SettingsTab from './GeneralTab/SettingsTab'

export class AdminTab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      users: []
    };
    //this.renderAccounts = this.renderAccounts.bind(this)
    this.notAdmin = this.notAdmin.bind(this)
  }

  notAdmin(user) {
    return user.user_type !== "admin"
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    accounts()
      .then(({data}) => {
        var users = data.filter(this.notAdmin)
        this.setState({
          users: users
        })
        console.log(this.state.users)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {

    const allUsers = this.state.users.map((user, index) =>
      <tr key={user.id}>
        <th scope="row">{index + 1}</th>
        <td>
          {user.user_type}
        </td>
        <td>
          {user.first_name}
        </td>
        <td>
          {user.last_name}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          <Button
            size="sm"
            color="success"
          >
            Accept
          </Button>
          <Button
            size="sm"
            color="danger"
          >
            Decline
          </Button>
        </td>
        <td>
          {user.enabled ?
            "Enabled" : "Disabled"}
        </td>
      </tr>
    )

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
                <h4>User List</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers}
                  </tbody>
                </Table>
              </Row>
            </TabPane>
            <ProfileTab />
            <SettingsTab />
          </TabContent>
        </div>
      </div>
    );
  }
}
