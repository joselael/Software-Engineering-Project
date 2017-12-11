import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';
import SummaryModal from './SummaryModal'

export default class UserHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {

    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.history.title}</td>
        <td>{this.props.history.rating_assignee}</td>
        <td>{this.props.history.rating_author}</td>
        <td>
          <Button
            color="success"
            onClick={this.toggleModal}
          >
            More
          </Button>
          <SummaryModal modal={this.state.modal} toggleModal={this.toggleModal} project={this.props.history}/>
        </td>
      </tr>
    )
  }
}