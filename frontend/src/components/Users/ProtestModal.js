import React, { Component } from 'react';
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  FormGroup,
  ButtonGroup
 } from 'reactstrap'
import store from '../../store'
import {firstLoggedIn, updateMe, protestWarning} from '../../utils/Users'

export default class ProtestModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      protestMSG: "",
      modal: true
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submitProtest = this.submitProtest.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  //First change the first_login to false then update the values of user of github and linked in
  //Then update the user in the redux to re render the page 
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  submitProtest() {
    console.log("Submitting protest")
    protestWarning(store.getState().token, store.getState().user._id, this.state.protestMSG)
      .then( (response) => {
        console.log(response)
        this.toggleModal()
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  render() {
    return(
      <Modal isOpen={this.state.modal}>
        <ModalHeader>
          Would you like to protest your warning?
        </ModalHeader>
        <ModalBody>
          <form onSubmit={this.toggleModal}>
            <FormGroup>
              <Label>Protest Message</Label>
              <Input
                autoFocus
                type="textarea"
                name="protestMSG"
                onChange={this.handleChange.bind(this)}
                value={this.state.protestMSG}
              />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              onClick={this.submitProtest}
              color="primary"
            >
              Submit
            </Button>
            <Button
              onClick={this.toggleModal}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    )
  }
}