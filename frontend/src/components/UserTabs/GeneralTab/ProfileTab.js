import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem,
  NavLink, Button, Table,
  Row, Col, Media, CardTitle, CardText, CardHeader, CardBody, Card} from 'reactstrap';
import store from '../../../store'


export default class ProfileTab extends Component {
    render() {
        return(
            <TabPane tabId="2" className="Profile-Tab">
                <Row>
                  <Col>
                  <img src="../../../images/profile.png"/>
                    <Media>
                      <Media left href="#">
                        <Media object src="../../../images/profile.png"/>
                      </Media>
                    </Media>
                    <Media body>
                      <Media heading>
                        {store.getState().user.first_name} {store.getState().user.last_name}
                      </Media>
                      {store.getState().user.user_type}
                    </Media>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <Card>
                      <CardHeader>Username </CardHeader>
                        <CardBody>
                          <CardText> {store.getState().user.username} </CardText>
                        </CardBody>
                      </Card>
                      <br/>
                      <Card>
                        <CardHeader>Email</CardHeader>
                          <CardBody>
                            <CardText> {store.getState().user.email} </CardText>
                          </CardBody>
                        </Card>
                        <br/>
                        <Card>
                          <CardHeader>LinkedIn</CardHeader>
                            <CardBody>
                              <CardText> {store.getState().user.linkedinURL} </CardText>
                            </CardBody>
                          </Card>
                          <br/>
                          <Card>
                            <CardHeader>Github </CardHeader>
                              <CardBody>
                                <CardText> {store.getState().user.githubURL} </CardText>
                              </CardBody>
                          </Card>
                          <br/>
                  </Col>
                </Row>
            </TabPane>
        )
    }
}
