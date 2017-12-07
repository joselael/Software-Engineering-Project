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
export default class ProjectModal extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false,
      developer: ""
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value}); //this requires each to have a name when used
    console.log(this.state)
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
        <td>{this.props.project.title}</td>
        <td>{this.props.project.max_budget}</td>
        <td>
          <Button
            size="sm"
            color="primary"
            onClick={this.toggleModal}
          >
            Link
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
            <ModalHeader>
              {this.props.project.title}
            </ModalHeader>
            <ModalBody>
              <Label>Project Summary</Label>
                <p className="modelP"> {this.props.project.summary} </p>
              <Label>Project Details</Label>
                <p className="modelP">{this.props.project.details}</p>
              <div className="row">
                <div className="col-md-6">
                <Label>Bid Starts:</Label>
                  <p className="modelP">{this.props.project.bid_start}</p>
                </div>
                  <div className="col-md-6">
                  <Label>Bid End:</Label>
                  <p className="modelP">{this.props.project.bid_end}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
                <Input 
                  type="select" 
                  name="developer" 
                  value={this.state.developer} 
                  onChange={this.handleChange}>
                  <option value="" disabled>Choose the developer</option> 
                  <option value="developer1">Developer name</option>
                </Input>
                <ButtonGroup>
                  <Button color="danger" onClick={this.toggleModal}>
                    Choose
                  </Button>
                  <Button color="primary" onClick={this.toggleModal}>
                    Cancel
                  </Button>
                </ButtonGroup>
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    )
  }
}