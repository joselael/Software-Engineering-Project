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
import AdminUser from '../Users/AdminUsers'
import AdminUserWorkOrder from '../Users/Admin/AdminUsersWorkOrder'
import {accounts, acceptUser, rejectUser} from '../../utils/Users'
import {projects} from '../../utils/Projects'
import store from '../../store'

export default class WorkOrder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      projects: []
    }
    this.updateTable = this.updateTable.bind(this)
    this.checkPendingDeletion = this.checkPendingDeletion.bind(this)
    this.notAdmin = this.notAdmin.bind(this)
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
  componentDidMount() {
    this.updateTable()
  }

  checkPendingDeletion(user) {
    return user.delete_requested
  }

  notAdmin(user) {
    return user.user_type !== "admin"
  }

  render() {

    const pendingDeletionUsers = this
      .state.users.filter(this.checkPendingDeletion)
      .map((user, index) => 
        <AdminUserWorkOrder key={user._id} user={user} index={index} updateTable = {() => this.updateTable()}/>
      )

    return (
      <TabPane tabId={this.props.tabId} className="WorkOrder">
        <Table hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {pendingDeletionUsers}
          </tbody>
        </Table>
      </TabPane>
    )
  }
}