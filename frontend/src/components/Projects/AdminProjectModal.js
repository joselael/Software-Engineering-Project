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
import {deleteProject, approveProject, penalizeUser} from '../../utils/Projects'

export default class ProjectModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      review: false,
      comments: "",
      penalty: 0
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.approveProject = this.approveProject.bind(this)
    this.reviewProject = this.reviewProject.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitReview = this.submitReview.bind(this)
  }

  //Approve Project's Assignee
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

  //Delete Project
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

  reviewProject() {
    this.setState({
      review: !this.state.review
    })
  }

  submitReview() {
    const comments = this.state.comments
    const penalty = this.state.penalty

    penalizeUser(this.props.project._id, comments, penalty)    
      .then( (response) => {
        console.log(response)
        alert("Submitting review...")
      })
      .catch( (err) => {
        console.log(err)
      })

    this.reviewProject()
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {

    var status = ""

    if (this.props.project.problematic) {
      status = "PROBLEMATIC"
    } else if (this.props.project.require_review) {
      status = "REQUIRE REVIEW"
    } else if(this.props.project.completed) {
      status = "COMPLETED"
    } else {
      status = "IN PROGRESS"
    }

    var buttons = ""

    if (this.props.project.require_review)
      buttons =  
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
    else if(this.props.project.problematic)
      buttons =
        <ButtonGroup>
          <Button
            size="sm"
            color="success"
            onClick={this.reviewProject}
            >
            Review
          </Button>
          <Button
          size="sm"
          color="danger"
          onClick={this.deleteProject}
          >
            Delete
          </Button>
        </ButtonGroup>
    else 
      buttons =
        <Button
          size="sm"
          color="danger"
          onClick={this.deleteProject}>
          Delete
        </Button>

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
                  <div className="modelP">{this.props.project.assignee.username}</div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal toggle={this.reviewProject} isOpen={this.state.review}>
            <ModalHeader>Review Project</ModalHeader>
            <ModalBody>
              <Label>Reason for Bad Review:</Label>
              <div className="modelP">{this.props.project.author_comments}</div>
              <Label>Your Comments</Label>
              <Input
                autoFocus
                type="textarea"
                value={this.state.comments}
                name="comments"
                onChange={this.handleChange}
              />
              <Label>Penalty for Assignee</Label>
              <Input
                type="number"
                name="penalty"
                value={this.state.penalty}
                onChange={this.handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="success"
                  onClick={this.submitReview}
                  >
                  Review
                </Button>
                <Button
                size="sm"
                color="danger"
                onClick={this.deleteProject}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal>
        </td>
        <td>
          {buttons}
        </td>
      </tr>
    )
  }
}
