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
import {approveMoney, disapproveMoney} from '../../utils/Users'
import store from '../../store'

export default class AdminRequestMoney extends Component {

  constructor(props) {
    super(props)

    this.state = {
      new_balance: this.props.user.account_balance + this.props.user.req_money
    }
    this.approveMoney = this.approveMoney.bind(this)
    this.disapproveMoney = this.disapproveMoney.bind(this)
  }

  approveMoney() {

    const new_balance = this.state.new_balance

    approveMoney(store.getState().token, this.props.user._id, new_balance)
      .then( (response) => {
        console.log(response)
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  disapproveMoney() {
    disapproveMoney(store.getState().token, this.props.user._id)
      .then( (response) => {
        console.log(response)
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  render() {
    
    const buttons = 
      <ButtonGroup>
        <Button
          color="success"
          onClick={this.approveMoney}
        >
          Approve
        </Button>
        <Button
          color="danger"
          onClick={this.disapproveMoney}
        >
          Disapprove
        </Button>
      </ButtonGroup>

    //console.log(this.props)
 //   console.log(this.state.new_balance)

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
          {this.props.user.last_name.value}
        </td>
        <td>
          {this.props.user.username}
        </td>
        <td>
          {this.props.user.req_money}
        </td>
        <td>
          {buttons}
        </td>
      </tr>
    )
  }
}
