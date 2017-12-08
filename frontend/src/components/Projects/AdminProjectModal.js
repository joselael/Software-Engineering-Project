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
import {deleteProject, approveProject} from '../../utils/Projects'

export default class ProjectModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.approveProject = this.approveProject.bind(this)
  }

  approveProject() {

    const projectID = this.props.project._id;

    approveProject(projectID)
      .then( (response) => {
        console.log(response)
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err.request)
      })
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

    console.log(this.props.project)

    var status = ""

    if(this.props.project.completed) {
      status = "COMPLETED"
    }
    else if (this.props.project.problematic) {
      status = "PROBLEMATIC"
    }
    else if (this.props.project.require_review) {
      status = "REQUIRE REVIEW"
    } else {
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
              <Label>Project Summary</Label>
                <p className="modelP"> {this.props.project.summary} </p>
              <Label>Project Details</Label>
              <p className="modelP">{this.props.project.details}</p>
              <div className="row">
                <div className="col-md-6">
                  <Label>Bid Starts:</Label>
                  <div className="modelP">{this.props.project.bid_start}</div>
                </div>
                <div className="col-md-6">
                  <Label>Bid End:</Label>
                  <div className="modelP">{this.props.project.bid_end}</div>
                </div>
                <div className="col-md-6">
                  <Label>Reason for selection:</Label>
                  <div className="modelP">{this.props.project.reason_for_selection}</div>
                </div>
                <div className="col-md-6">
                  <Label>Assignee:</Label>
                  <div className="modelP">{this.props.project.assignee_username}</div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </td>
        <td>
          {this.props.project.require_review ? 
          <ButtonGroup>
            <Button
              size="sm" 
              color="success"
              onClick={this.approveProject}
              >
              Approve 
            </Button>
            <Button
            size="sm" 
            color="danger"
            onClick={this.deleteProject}
            >
              Decline
            </Button>
          </ButtonGroup>
          :
          <Button
           size="sm" 
           color="danger"
           onClick={this.deleteProject}
          >
            Delete 
          </Button>
          }
        </td>
      </tr>
    )
  }
}