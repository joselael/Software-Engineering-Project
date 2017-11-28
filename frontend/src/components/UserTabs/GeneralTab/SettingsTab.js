import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, 
  NavLink, Button, Table,
  Row, Col, Media } from 'reactstrap';
import store from '../../../store'

export default class SettingsTab extends Component {
    render() {
        return(
            <TabPane tabId="3" className="Setting-Tab">
              <Row>
                <Col sm="12">
                  <h4>I am setting tab</h4>
                </Col>
              </Row>
            </TabPane>
        )
    }
}