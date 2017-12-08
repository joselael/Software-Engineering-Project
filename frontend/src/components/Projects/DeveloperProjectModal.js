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
import {finishProject} from '../../utils/Projects'

export default class ProjectModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.submitFinish = this.submitFinish.bind(this)
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  submitFinish() {
    finishProject(this.props.project._id)
      .then( (response) => {
        console.log(response)
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err)
      })
    this.toggleModal()
  }
  
  render() {

    var status = ""

    if(this.props.project.require_review)
      status = "UNDER REVIEW"
    else if(this.props.project.bidding_in_progress)
      status = "BIDDING"
    else if(this.props.project.problematic)
      status = "PROBLEMATIC"
    else if(this.props.project.require_rating)
      status = "UNDER RATING"
    else
      status = "WIP"

    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.project.title}</td>
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
              </div>
            </ModalBody>
            <ModalFooter>
              {
                status === "WIP" ?
                <ButtonGroup>
                  <Button color="success" onClick={this.submitFinish}>
                    Finish
                  </Button>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Cancel
                  </Button>
                </ButtonGroup> :
                <Button color="secondary" onClick={this.toggleModal}>
                  Cancel
                </Button>
              }
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    )
  }
}