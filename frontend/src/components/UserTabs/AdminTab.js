import React, {Component} from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Table,
  FormGroup,
  Row,
  Col,
  Media,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import '../../css/usertab.css';
import {accounts, acceptUser, rejectUser} from '../../utils/Users'
import {projects} from '../../utils/Projects'
import store from '../../store'
import classnames from 'classnames'
import ProfileTab from './GeneralTab/ProfileTab'
import SettingsTab from './GeneralTab/SettingsTab'
import ProjectModal from '../Projects/AdminProjectModal'
import AdminRequestMoney from '../Users/AdminRequestMoney'
import AdminUser from '../Users/AdminUsers'

export class AdminTab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this
      .toggle
      .bind(this);
    this.state = {
      activeTab: '1',
      modal: false,
      reject_reason: "",
      link: false,
      users: [],
      projects: []
    };
    this.notAdmin = this
      .notAdmin
      .bind(this)
    this.checkPending = this
      .checkPending
      .bind(this)
    this.checkAccept = this.checkAccept.bind(this)
    this.checkBlacklist = this
      .checkBlacklist
      .bind(this)
    this.acceptUser = this
      .acceptUser
      .bind(this)
    this.updateTable = this
      .updateTable
      .bind(this)
    this.toggleModal = this
      .toggleModal
      .bind(this)
    this.handleChange = this
      .handleChange
      .bind(this)
    this.rejectUser = this
      .rejectUser
      .bind(this)
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  updateTable() {
    accounts(store.getState().token).then(({data}) => {
      var users = data.filter(this.notAdmin)
      this.setState({users: users})
    }).catch((err) => {
      console.log(err)
    })
    projects().then( (response) => {
      this.setState({
        projects: response.data
      })
      console.log(this.state.projects)
      console.log("Updating table...")
    }).catch( (err) => {
      console.log(err)
    })
  }

  rejectUser = id => event => {
    console.log("Rejecting User")
    this.setState({reject_reason: ""})

    const reject_msg = this.state.reject_reason
    rejectUser(store.getState().token, id, reject_msg).then((response) => {
      this.updateTable()
      this.toggleModal()
    })
  }

  acceptUser = id => event => {
    console.log("Accepting user")
    acceptUser(store.getState().token, id).then((response) => {
      this.updateTable()
    })
  }

  checkPendingDeletion(user) {
    return user.delete_requested
  }

  checkAccept(user) {
    return user.enabled && !user.blacklisted && !user.delete_requested
  }

  checkPending(user) {
    return !user.enabled && !user.blacklisted && !user.delete_requested
  }

  checkBlacklist(user) {
    return user.blacklisted && !user.delete_requested
  }

  notAdmin(user) {
    return user.user_type !== "admin"
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  componentDidMount() {
    this.updateTable()
  }

  render() {

    const pendingUsers = this
      .state
      .users
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
          {user.last_name.value}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="success"
              value={user.token}
              onClick={this.acceptUser(user._id)}>
              Accept
            </Button>
            <Button size="sm" color="danger" onClick={this.toggleModal}>
              Decline
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <FormGroup>
                <Label>Why are you rejecting {user.username}
                  ?</Label>
                <Col sm={12}>
                  <Input
                    autoFocus
                    type="textarea"
                    name="reject_reason"
                    placeholder="Reason"
                    onChange={this.handleChange}
                    value={this.state.reject_reason}/>
                </Col>
              </FormGroup>
              <ModalFooter>
                <Button color="danger" onClick={this.rejectUser(user._id)}>
                  Reject
                </Button>
                <Button color="primary" onClick={this.toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ButtonGroup>
        </td>
        <td>
          {user.enabled
            ? "Enabled"
            : "Disabled"}
        </td>
      </tr>)

    const acceptedUsers = this
      .state.users.filter(this.checkAccept)
      .map((user, index) =>
        <AdminUser key={user._id} user={user} index={index} updateTable = {() => this.updateTable()} />
      )

    const blacklistedUsers = this
      .state.users.filter(this.checkBlacklist)
      .map((user, index) =>
        <AdminUser key={user._id} user={user} index={index} updateTable = {() => this.updateTable()}/>
      )

    const pendingDeletionUsers = this
      .state.users.filter(this.checkPendingDeletion)
      .map((user, index) => 
        <AdminUser key={user._id} user={user} index={index} updateTable = {() => this.updateTable()}/>
      )

    const pendingRequestMoney = ''

    const allProjects = this.state.projects
      .map((project, index) =>
        <ProjectModal key={project._id} project={project} index={index} updateTable = {() => this.updateTable()}/>
      )
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '1'
            })}
              onClick={() => {
              this.toggle('1');
            }}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '2'
            })}
              onClick={() => {
              this.toggle('2');
            }}>
              Projects
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '3'
            })}
              onClick={() => {
              this.toggle('3');
            }}>
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '4'
            })}
              onClick={() => {
              this.toggle('4');
            }}>
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <div className="activeTab">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
            <br/>
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
                <h4>Pending Deletion</h4>
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
                    {pendingDeletionUsers}
                  </tbody>
                </Table>
                <h4>Requesting more money</h4>
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
                    {pendingRequestMoney}
                  </tbody>
                </Table>
              </Row>
            </TabPane>
            <TabPane tabId="2">
            <br/>
              <Row>
                <h4>All Projects</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Max Bid</th>
                      <th>Status</th>
                      <th>Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProjects}
                  </tbody>
                </Table>
              </Row>
            </TabPane>
            <ProfileTab tabId={"3"}/>
            <SettingsTab tabId={"4"}/>
          </TabContent>
        </div>
      </div>
    );
  }
}
