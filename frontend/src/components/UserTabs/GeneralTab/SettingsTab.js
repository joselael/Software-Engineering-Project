import React, { Component } from 'react';
import { Form, FormGroup,TabPane, Label,
  Row, Col, Button, Collapse,
  Card, CardBody, Input, ButtonGroup,
  Modal, ModalHeader, ModalBody, ModalFooter
 } from 'reactstrap';
import store from '../../../store'
import {checkUser, updateSettings} from '../../../utils/Users'
import {userInfo} from '../../../utils/Auth'

export default class SettingsTab extends Component {
  constructor(props){
    super(props);
      this.state={
        oldpassword: '',
        newpassword: '',
        newpasswordconfirmation: '',
        github: '',
        linkedIn: '',
        email: '',
        first_name: '',
        last_name: '',
        auth: false,
        collapse: false,
        delete: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this)
      this.onSubmitAuth = this.onSubmitAuth.bind(this)
      this.toggle = this.toggle.bind(this)
      this.toggleAuth = this.toggleAuth.bind(this)
      this.toggleDelete = this.toggleDelete.bind(this)
      this.clearState = this.clearState.bind(this)
      this.submitDelete = this.submitDelete.bind(this)
  }

  submitDelete() {

    var data = {
      delete_requested: true
    }

    updateSettings(store.getState().token, data)
      .then( (response) => {
        alert("Sending delete request to admin...")
      }).catch( (err) => {
        console.log(err)
      })
  }

  clearState() {
    this.setState({
      oldpassword: '',
      newpassword: '',
      newpasswordconfirmation: '',
      github: '',
      linkedIn: '',
      email: '',
      first_name: '',
      last_name: ''
    })
  }

  onSubmitAuth = e => {
    e.preventDefault()
    checkUser(store.getState().token, this.state.oldpassword)
      .then( (response) => {
        console.log(response.data)
        if(response.data) {
          this.toggleAuth()
          this.clearState()
          this.toggle()
        } else {
          alert("You're not authorized")
          this.clearState()
          this.toggleAuth()
        }
      }).catch( (err) => {
        alert("You're not authorized")
        this.toggleAuth()
        this.clearState()
      })
  }
  toggleAuth() {
    this.setState({
      auth: !this.state.auth
    })
  }

  toggleDelete() {
    this.setState({
      delete: !this.state.delete
    })
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value}); //this requires each to have a name when used
  }

  onSubmit(e) {

    var data = {}
    if(this.state.newpassword.length > 0) {
      if(this.state.newpassword === this.state.newpasswordconfirmation ){ //still need to check if old password is correct
        e.preventDefault();
        if(this.state.newpassword.length > 8) {
          data.password = this.state.newpassword
        }
      }else{
        alert("Passwords do not match")
      }
    }
    if(this.state.first_name.length > 2) {
      data.first_name = this.state.first_name
    }
    if(this.state.last_name.length > 2) {
      data.last_name.value = this.state.last_name
    }
    if(this.state.linkedIn.length > 2) {
      data.linkedIn.value = this.state.linkedIn
    }
    if(this.state.github.length > 2) {
      data.github.value = this.state.linkedIn
    }
    if(this.state.email.length > 2) {
      data.email.value = this.state.email
    }
    updateSettings(store.getState().token, data)
      .then( (response) => {
        userInfo(store.getState().token)
          .then( (response) => {
            alert("Information changed!!!")
            this.toggle()
            this.clearState()
          }).catch( (err) => {
            console.log(err)
          })
      }).catch( (err) => {
        console.log(err)
      })
    e.preventDefault(e)
  }

  render() {
      return(
        <TabPane tabId={this.props.tabId} className="Setting-Tab">
        <br/>
          <Button color="primary" onClick={this.toggleAuth}> 
            Make Changes
          </Button>
          <Modal isOpen={this.state.auth} toggle={this.toggleAuth}>
            <ModalHeader>Confirm your password</ModalHeader>
            <ModalBody>
              <form onSubmit={this.onSubmitAuth}>
                <FormGroup>
                  <Label> Password </Label>
                  <Input
                    value={this.state.oldpassword}
                    onChange={this.onChange}
                    type="password"
                    name="oldpassword"
                    placeholder="Password"
                    autoFocus
                  />
                </FormGroup>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={this.onSubmitAuth}
              >
                Submit Password
              </Button>
              <Button
                color="primary"
                onClick={this.toggleAuth}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
            <Collapse isOpen={this.state.collapse}>
            <br/>
            <Card>
              <CardBody>
                <form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label> New FirstName </Label>
                    <Input
                      value={this.state.first_name}
                      onChange={this.onChange}
                      type="first_name"
                      name="first_name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label> New LastName </Label>
                    <Input
                      value={this.state.last_name}
                      onChange={this.onChange}
                      type="last_name"
                      name="last_name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label> New LinkedIn </Label>
                    <Input
                      value={this.state.linkedIn}
                      onChange={this.onChange}
                      type="linkedIn"
                      name="linkedIn"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label> New Github </Label>
                    <Input
                      value={this.state.github}
                      onChange={this.onChange}
                      type="github"
                      name="github"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label> New Email </Label>
                    <Input
                      value={this.state.email}
                      onChange={this.onChange}
                      type="email"
                      name="email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label> New password </Label>
                    <Input 
                      value={this.state.newpassword} 
                      onChange={this.onChange} 
                      type="password" 
                      name="newpassword" 
                      placeholder= "new password" 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label> Confirm password </Label>
                    <Input 
                      value={this.state.newpasswordconfirmation} 
                      onChange={this.onChange} 
                      type="password" 
                      name="newpasswordconfirmation" 
                      placeholder= "confirm new passwrod" 
                    />
                  </FormGroup>
                  <ButtonGroup>
                    <Button 
                      type="submit" 
                      color="success"
                      onClick={this.onSubmit}
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={this.toggle}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </form>
              </CardBody>
            </Card>
            </Collapse>
          <Button color="danger" onClick={this.toggleDelete}>
            Delete Account
          </Button>
          <Button color="success">
            Input More Money
          </Button>
          <Modal isOpen={this.state.delete} toggle={this.toggleDelete}>
            <ModalBody>
              <h4>Are you sure you want to delete?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.submitDelete}>
                YES
              </Button>
              <Button onClick={this.toggleDelete}>
                NO
              </Button>
            </ModalFooter>
          </Modal>
        </TabPane>
      )
  }
}
