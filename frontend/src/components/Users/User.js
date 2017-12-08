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
import store from '../../store'
import '../../css/project.css'

export default class User extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false,
      bid: 0,
      description: ""
    }
    console.log(this.props.user)
  }

  render() {

    return (
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.user.username}</td>
        <td>{this.props.user.last_name}, {this.props.user.first_name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.linkedIn}</td>
        <td>{this.props.user.github}</td>
      </tr>
    );
  }
};

