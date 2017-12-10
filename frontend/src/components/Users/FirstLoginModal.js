import React, { Component } from 'react';
import { Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  InputGroup,
  Input,
  Label,
  FormGroup
 } from 'reactstrap'
import store from '../../store'
import {firstLoggedIn, updateMe} from '../../utils/Users'
import {userInfo} from '../../utils/Auth'

export default class FirstLoginModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      github: "",
      linkedIn: "",
      resume: ""
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //First change the first_login to false then update the values of user of github and linked in
  //Then update the user in the redux to re render the page 
  toggleModal() {

    //console.log(this.state)  

    firstLoggedIn(store.getState().token)
      .then( (response) => {
        updateMe(store.getState().token, this.state.github, this.state.linkedIn)
          .then( (response) => {
            userInfo(store.getState().token)
              .then( (response) =>{
                alert("Welcome to our website")
              }).catch( (err) => {
                console.log("User Info update failed")
              })
          }).catch( (err) => {
            console.log("Update me failed")
          })
      }).catch( (err) => {
        console.log("First Logged In failed")
      })
  }

  render() {
    return(
      <Modal isOpen={store.getState().user.first_login}>
        <ModalHeader>
          Update Your Information
        </ModalHeader>
        <ModalBody>
          <form onSubmit={this.toggleModal}>
            <FormGroup>
              <Label>Github URL</Label>
              <Input
                autoFocus
                type="github"
                name="github"
                placeholder="github URL"
                onChange={this.handleChange.bind(this)}
                value={this.state.github}
              />
              <Label>LinkedIn URL</Label>
              <Input
                type="linkedIn"
                name="linkedIn"
                placeholder="linkedIn URL"
                onChange={this.handleChange.bind(this)}
                value={this.state.linkedIn}
              />
              <Label for="resume">Resume</Label>
              <Input type="file" name="resume" id="resume" value={this.state.resume} />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick = {this.toggleModal}
            color="primary"
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}