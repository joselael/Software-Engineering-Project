import React, { Component } from 'react';
import { Form, FormGroup,TabPane, Label,
  Row, Col, Button, Collapse,
  Card, CardBody, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
 } from 'reactstrap';
import store from '../../../store'
import {checkUser, updateSettings} from '../../../utils/Users'

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
        auth: false,
        collapse: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this)
      this.onSubmitAuth = this.onSubmitAuth.bind(this)
      this.toggle = this.toggle.bind(this)
      this.toggleAuth = this.toggleAuth.bind(this)
      this.clearPass = this.clearPass.bind(this)
  }

  clearPass() {
    this.setState({
      oldpassword: ''
    })
  }

  toggleAuth() {
    this.setState({
      auth: !this.state.auth
    })
  }

  onSubmitAuth(e) {
    checkUser(store.getState().token, this.state.oldpassword)
      .then( (response) => {
        console.log(response.data)
        if(response.data) {
          this.toggleAuth()
          this.clearPass()
          this.toggle()
        } else {
          alert("You're not authorized")
          this.clearPass()
          this.toggleAuth()
        }
      }).catch( (err) => {
        alert("You're not authorized")
        this.toggleAuth()
        this.clearPass()
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
    if(this.state.newpassword === this.state.newpasswordconfirmation ){ //still need to check if old password is correct
      e.preventDefault();
      if(this.state.newpassword.length > 8) {
        data.password = this.state.newpassword
      }
    }else{
      alert("Passwords do not match")
    }
    if(this.state.linkedIn.length > 1) {
      data.linkedIn = this.state.linkedIn
    }
    if(this.state.github.length > 1) {
      data.github = this.state.linkedIn
    }
    if(this.state.email.length > 1) {
      data.email = this.state.email
    }

    console.log(data)
    updateSettings(store.getState().token, data)
      .then( (response) => {
        console.log(response)
      }).catch( (err) => {
        console.log(err)
      })
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
              <FormGroup>
                <Label> Password </Label>
                <Input
                  value={this.state.oldpassword}
                  onChange={this.onChange}
                  type="password"
                  name="oldpassword"
                  placeholder="Password"
                />
              </FormGroup>
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
                  <Button 
                    type="submit" 
                    color="info" 
                    size="md"
                    onClick={this.onSubmit}
                  >
                  Submit
                  </Button>
                </form>
              </CardBody>
            </Card>
            </Collapse>
        </TabPane>
      )
  }
}
