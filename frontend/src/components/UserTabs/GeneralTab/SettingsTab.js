import React, { Component } from 'react';
import { Form, FormGroup,TabPane, Label,
  Row, Col, Button } from 'reactstrap';
import store from '../../../store'

export default class SettingsTab extends Component {
  constructor(props){
    super(props);
      this.state={
        oldpassword: '',
        newpassword: '',
        newpasswordconfirmation: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
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
              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label> Old password </Label>
                      <input value={this.state.oldpassword} onChange={this.onChange} type="password" name="oldpassword" placeholder= "old password" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                      <Label> New password </Label>
                      <input value={this.state.newpassword} onChange={this.onChange} type="password" name="newpassword" placeholder= "new password" className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                      <Label> Confirm password </Label>
                      <input value={this.state.newpasswordconfirmation} onChange={this.onChange} type="password" name="newpasswordconfirmation" placeholder= "confirm new passwrod" className="form-control"/>
                    </FormGroup>
                    <Button type="submit" color="info" size="md">
                    Submit
                    </Button>
                  </form>
                </Col>
              </Row>
            </TabPane>
        )
    }
}
