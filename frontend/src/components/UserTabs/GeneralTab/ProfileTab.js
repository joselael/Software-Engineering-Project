import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, 
  NavLink, Button, Table,
  Row, Col, Media } from 'reactstrap';
import store from '../../../store'

export default class ProfileTab extends Component {
    render() {
        return(
            <TabPane tabId="2" className="Profile-Tab">
                <Row>
                <Col sm="6">
                    <h4>{store.getState().user.first_name} {store.getState().user.last_name}</h4>
                </Col>
                </Row>
            </TabPane>
        )
    }
}