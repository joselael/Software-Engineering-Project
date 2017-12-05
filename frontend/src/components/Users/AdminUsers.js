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
import {deleteUser, blacklistUser} from '../../utils/Users'
import store from '../../store'

export default class AdminUsers extends Component {

  constructor(props) {
    super(props)
    this.deleteUser = this.deleteUser.bind(this)
    this.blacklistUser = this.blacklistUser.bind(this)
  }

  deleteUser = id => event => {
    console.log("Deleting user")
    deleteUser(store.getState().token, id).then((response) => {
      this.props.updateTable()
    })
  }

  blacklistUser = id => event => {
    console.log("Blacklisting user")
    blacklistUser(store.getState().token, id).then((response) => {
      this.updateTable()
    })
  }

  render() {

    var status = ""

    if(this.props.user.blacklisted) {
      status = "BLACKLISTED"
    } else if(this.props.user.enabled) {
      status = "ENABLED"
    } else if(!this.props.user.enabled){
      status = "DISABLED"
    }

    return(
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <td>
          {this.props.user.user_type}
        </td>
        <td>
          {this.props.user.first_name}
        </td>
        <td>
          {this.props.user.last_name}
        </td>
        <td>
          {this.props.user.username}
        </td>
        <td>
          <Button
            size="sm"
            color="danger"
            value={this.props.user.token}
            onClick={this.deleteUser(this.props.user._id)}>
            Delete
          </Button>
        </td>
        <td>
          {status}
        </td>
      </tr>
    )
  }
}