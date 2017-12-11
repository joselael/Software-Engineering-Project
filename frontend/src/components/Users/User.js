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
  Table,
} from 'reactstrap';
import store from '../../store'
import '../../css/project.css'
import {history} from '../../utils/Users'
import UserHistory from './UserHistory'

export default class User extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false,
      bid: 0,
      description: "",
      history: []
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount() {
    history(this.props.user.username)
      .then( (response) => {
        this.setState({
          history: response.data
        })
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  render() {

    const historyUser = this.state.history
      .map( (history, index) => 
        <UserHistory history={history} index={index}/>
    )

    return (
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.user.username}</td>
        <td>{this.props.user.last_name}, {this.props.user.first_name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.linkedIn}</td>
        <td>{this.props.user.github}</td>
        <td>
          <Button
            onClick={this.toggleModal}
            color="success"
          >
            History
          </Button>
          <Modal toggle={this.toggleModal} isOpen={this.state.modal}>
            <ModalHeader>{this.props.user.username}'s History</ModalHeader>
            <ModalBody>
              <Table hover responsive striped>
                <thead>
                  <th>#</th>
                  <th>Title</th>
                  <th>Rating Assignee</th>
                  <th>Rating Author</th>
                  <th>Summary</th>
                </thead>
                <tbody>
                  {historyUser}
                </tbody>
              </Table>
            </ModalBody>
          </Modal>
        </td>
      </tr>
    );
  }
};

