import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem,
  NavLink, Button, Table,
  Row, Col, Media } from 'reactstrap';
import '../../css/usertab.css';
import { accounts, acceptUser, blacklistUser, deleteUser } from '../../utils/Users'
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
    this.checkPending = this.checkPending.bind(this)
    this.checkAccept = this.checkAccept.bind(this)
    this.checkBlacklist = this.checkBlacklist.bind(this)
    this.acceptUser = this.acceptUser.bind(this)
    this.declineUser = this.declineUser.bind(this)
    this.blacklistUser = this.blacklistUser.bind(this)
    this.updateTable = this.updateTable.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  updateTable() {
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

  blacklistUser = id => event => {
    console.log("Blacklisting user")
    console.log(id)
    blacklistUser(id)
      .then( (response) => {
        console.log(response)
        this.updateTable()
      })
  }

  deleteUser = id => event => {
    console.log("Deleting user")
    console.log(id)
    deleteUser(id)
      .then( (response) => {
        console.log(response)
        this.updateTable()
      })   
  }

  declineUser = id => event => {
    console.log("Disabling user")
    console.log(id)
  }

  acceptUser = id => event => {
    console.log("Accepting user")
    console.log(id)
    acceptUser(id)
      .then( (response) => {
        console.log(response)
        this.updateTable()
      })
  }

  checkAccept(user) {
    return user.enabled && !user.blacklisted
  }

  checkPending(user) {
    return !user.enabled && !user.blacklisted
  }

  checkBlacklist(user) {
    return user.blacklisted
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

  const pendingUsers = this.state.users
    .filter(this.checkPending)
    .map((user, index) =>
      <tr key={user._id}>
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
            value={user.token}
            onClick={this.acceptUser(user._id)}
          >
            Accept
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={this.declineUser(user._id)}
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

    const acceptedUsers = this.state.users
      .filter(this.checkAccept)
      .map((user, index) =>
        <tr key={user._id}>
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
              color="danger"
              onClick={this.blacklistUser(user._id)}
            >
              Blacklist
            </Button>
          </td>
          <td>
            {user.enabled ?
              "Enabled" : "Disabled"}
          </td>
        </tr>
      )

    const blacklistedUsers = this.state.users
      .filter(this.checkBlacklist)
      .map((user, index) =>
        <tr key={user._id}>
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
              color="danger"
              value={user.token}
              onClick={this.deleteUser(user._id)}
            >
              Delete
            </Button>
          </td>
          <td>
            {user.blacklisted ?
              "Blacklisted" : "Not blacklisted"}
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
                <h4>Pending User</h4>
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
                    {pendingUsers}
                  </tbody>
                </Table>
                <h4>Accepted User</h4>
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
                    {acceptedUsers}
                  </tbody>
                </Table>
                <h4>Blacklisted User</h4>
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
                    {blacklistedUsers}
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
