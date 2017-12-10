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
import {changeWarning} from '../../utils/Users'
import store from '../../store'

export default class AdminProtestUsers extends Component {

  constructor(props) {
    super(props)

    this.state = {
      MSG: false
    }
    this.removeWarning = this.removeWarning.bind(this)
    this.keepWarning = this.keepWarning.bind(this)
    this.toggleMSG = this.toggleMSG.bind(this)
  }

  toggleMSG() {
    this.setState({
      MSG: !this.state.MSG
    })
  }

  removeWarning() {
    changeWarning(store.getState().token, this.props.user._id, "remove")
      .then( (response) => {
        console.log(response)
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  keepWarning() {
    changeWarning(store.getState().token, this.props.user._id, "remove")
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
          onClick={this.removeWarning}
        >
          Remove Warning
        </Button>
        <Button
          color="danger"
          onClick={this.keepWarning}
        >
          Keep Warning
        </Button>
      </ButtonGroup>

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
          <Button
            onClick={this.toggleMSG}
          >
            MSG
          </Button>
          <Modal toggle={this.toggleMSG} isOpen={this.state.MSG}>
            <ModalBody>
              {this.props.user.protest_message}
            </ModalBody>
          </Modal>
        </td>
        <td>
          {buttons}
        </td>
      </tr>
    )
  }
}
