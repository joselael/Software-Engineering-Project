import React, {Component} from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Table,
  Row,
  Col,
  Media,
  FormGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import {deleteProject} from '../../utils/Projects'

export default class ProjectModal extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
  }

  deleteProject() {
    deleteProject(this.props.project._id)
      .then( (response) => {
        console.log(response)
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {

    var status = ""

    if(this.props.project.completed) {
      status = "COMPLETED"
    }
    else if (this.props.project.problematic) {
      status = "PROBLEMATIC"
    }
    else {
      status = "IN PROGRESS"
    }

    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.project.title}</td>
        <td>{this.props.project.max_budget}</td>
        <td>{status}</td>
        <td>
          <Button
            size="sm"
            color="primary"
            onClick={this.toggleModal}
          >
            Link
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>{this.props.project.title}
            </ModalHeader>
            <ModalBody>
              <Label>Project Summary</Label><br/>
                {this.props.project.summary}<br/>
              <Label>Project Details</Label><br/>
                {this.props.project.details}
              <Label>Bid Start Date</Label><br/>
                {this.props.project.bid_start}<br/>
              <Label>Bid End Date</Label><br/>
                {this.props.project.bid_end}<br/>
            </ModalBody>
          </Modal>
        </td>
        <td>
          <Button
           size="sm" 
           color="danger"
           onClick={this.deleteProject}
          >
            Delete 
          </Button>
        </td>
      </tr>
    )
  }
}