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

export default class SummaryModal extends Component {

  render() {

    return (

      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
        <ModalHeader>{this.props.project.title}</ModalHeader>
        <ModalBody>
          <Label>Project Summary</Label>
            <p className="modelP"> {this.props.project.summary} </p>
          <Label>Project Details</Label>
            <p className="modelP">{this.props.project.details}</p>
          <Label>Project Author</Label>
            <p className="modelP">{this.props.project.author}</p>
          <Label> Maximum Budget</Label>
            <p className="modelP">$ {this.props.project.max_budget}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    )
  }
}