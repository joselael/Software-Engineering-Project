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
        github_show: false,
        linkedIn: '',
        linkedIn_show: false,
        email: '',
        email_show: false,
        first_name: '',
        last_name: '',
        last_name_show: false,
        auth: false,
        collapse: false,
        moneycollapse: false,
        delete: false,
        moremoney: 0,
        id: ""
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this)
      this.onSubmitAuth = this.onSubmitAuth.bind(this)
      this.toggle = this.toggle.bind(this)
      this.toggleAuth = this.toggleAuth.bind(this)
      this.toggleDelete = this.toggleDelete.bind(this)
      this.clearState = this.clearState.bind(this)
      this.submitDelete = this.submitDelete.bind(this)
      this.toggleMoney = this.toggleMoney.bind(this)
      this.onSubmitMoney = this.onSubmitMoney.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
        if(response.data) {
          this.setState({
            auth: !this.state.auth
          })
          if (this.state.id === "change") {
            this.clearState()
            this.toggle()
          } else if (this.state.id === "delete") {
            this.toggleDelete()
          } else if(this.state.id === "money") {
            this.toggleMoney()
          }
        } else {
          alert("You're not authorized")
          this.clearState()
          this.setState({
            auth: !this.state.auth
          })
        }
      }).catch( (err) => {
        alert("You're not authorized")
        this.setState({
          auth: !this.state.auth
        })
        this.clearState()
      })
  }

  toggleAuth = e => {
    this.setState({
      id: e.target.id
    })
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

  toggleMoney() {
    this.setState({
      moneycollapse: !this.state.moneycollapse
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
      }else
        alert("Passwords do not match")
    }
    if(this.state.first_name.length > 2) {
      data.first_name = this.state.first_name
    }
    if(this.state.last_name.length > 2) {
      data.last_name = {}
      data.last_name.visible = this.state.last_name_show
      data.last_name.value = this.state.last_name
    }
    if(this.state.linkedIn.length > 2) {
      data.linkedIn = {}
      data.linkedIn.visible = this.state.linkedIn_show
      data.linkedIn.value = this.state.linkedIn
    }
    if(this.state.github.length > 2) {
      data.github = {}
      data.github.visible = this.state.github_show
      data.github.value = this.state.github
    }
    if(this.state.email.length > 2) {
      data.email = {}
      data.email.visible = this.state.email_show
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

  onSubmitMoney = e => {
    e.preventDefault()
    console.log("Add more money")
  }

  render() {
      return(
        <TabPane tabId={this.props.tabId} className="Setting-Tab">
        <br/>

          <ButtonGroup>
            <Button id="change" color="primary" onClick={this.toggleAuth}>
              Make Changes
            </Button>
            <Button id="delete" color="danger" onClick={this.toggleAuth}>
              Delete Account
            </Button>
            <Button id="money" color="success" onClick={this.toggleAuth}>
              Input More Money
            </Button>
          </ButtonGroup>

          <Modal isOpen={this.state.delete} toggle={this.toggleDelete}>
            <ModalBody>
              <h4>Are you sure you want to delete?</h4>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button color="danger" onClick={this.submitDelete}>
                  YES
                </Button>
                <Button onClick={this.toggleDelete}>
                  NO
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal>

          <Modal value="" isOpen={this.state.auth}>
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
              <ButtonGroup>
                <Button
                  color="danger"
                  onClick={this.onSubmitAuth}
                >
                  Submit Password
                </Button>
                <Button
                  color="primary"
                  id=""
                  onClick={this.toggleAuth}
                >
                  Cancel
                </Button>
              </ButtonGroup>
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

                  <Label check>
                  <Input type="checkbox" 
                    name="last_name_show"
                    checked={this.state.last_name_show}
                    onChange={this.handleInputChange}
                    />
                    Make Public
                  </Label>

                </FormGroup>
                <FormGroup>
                  <Label> New LinkedIn </Label>
                  <Input
                    value={this.state.linkedIn}
                    onChange={this.onChange}
                    type="linkedIn"
                    name="linkedIn"
                  />

                  <Label check>
                  <Input type="checkbox" 
                    name="linkedIn_show"
                    checked={this.state.linkedIn_show}
                    onChange={this.handleInputChange}
                    />
                    Make Public
                  </Label>

                </FormGroup>

                <FormGroup>
                  <Label> New Github </Label>
                  <Input
                    value={this.state.github}
                    onChange={this.onChange}
                    type="github"
                    name="github"
                  />
                  <Label check>
                  <Input type="checkbox" 
                    name="github_show"
                    checked={this.state.github_show}
                    onChange={this.handleInputChange}
                    />
                    Make Public
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Label> New Email </Label>
                  <Input
                    value={this.state.email}
                    onChange={this.onChange}
                    type="email"
                    name="email"
                  />

                  <Label check>
                  <Input type="checkbox" 
                    name="email_show"
                    checked={this.state.email_show}
                    onChange={this.handleInputChange}
                    />
                    Make Public
                  </Label>
                  
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

          <Collapse isOpen={this.state.moneycollapse}>
          <Card>
            <CardBody>
              <form onSubmit={this.onSubmitMoney}>
                <FormGroup>
                  <Label> More Money </Label>
                  <Input
                    value={this.state.moremoney}
                    onChange={this.onChange}
                    type="moremoney"
                    name="moremoney"
                  />
                </FormGroup>
                <ButtonGroup>
                  <Button
                    type="submit"
                    color="success"
                  >
                    Submit
                  </Button>
                  <Button
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </form>
            </CardBody>
          </Card>
          </Collapse>

        </TabPane>
      )
  }
}
