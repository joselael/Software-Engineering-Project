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
export default class ProjectModal extends Component {

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
              {this.props.project.summary}
            </ModalBody>
            <ModalFooter>
              <FormGroup>
              <select value={this.state.dev_username} 
                onChange={this.handleChange} 
                type="text" 
                name="dev_username" 
                className="form-control">
                <option value="" disabled> Choose your user type </option>
                <option value="developer"> Developer </option>
                <option value="client"> Client </option>
              </select>
              </FormGroup>
              <Button color="danger" onClick={this.toggleModal}>
                Choose
              </Button>
              <Button color="primary" onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    )
  }
}