import React, { Component } from 'react';
import { Form, FormGroup,TabPane, Label,
  Row, Col, Button, Collapse,
  Card, CardBody, Input,
  Modal, ModalHeader, ModalBody, ModalFooter
 } from 'reactstrap';
import store from '../../../store'

export default class SettingsTab extends Component {
  constructor(props){
    super(props);
      this.state={
        oldpassword: '',
        newpassword: '',
        newpasswordconfirmation: '',
        github: '',
        linkedIn: '',
        auth: false,
        collapse: false
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.toggle = this.toggle.bind(this)
      this.toggleAuth = this.toggleAuth.bind(this)
  }

  toggleAuth() {
    this.setState({
      auth: !this.state.auth
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
    if(this.state.newpassword === this.state.newpasswordconfirmation ){ //still need to check if old password is correct
      //Enter code here to post new password
      console.log(this.state);
      e.preventDefault();
    }else{
      alert("Passwords do not match")
    }
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
                onClick={this.toggle}
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
                    <Label> New Email </Label>
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
                    <Label> New LinkedIn </Label>
                    <Input/>
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
                  <Button type="submit" color="info" size="md">
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
