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

export default class UserHistory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>This works</td>
        <td>{this.props.history.summary}</td>
        <td>{this.props.history.rating_assignee}</td>
        <td>{this.props.history.rating_author}</td>
        <td>{this.props.history.props.project_end}</td>
      </tr>
    )
  }
}