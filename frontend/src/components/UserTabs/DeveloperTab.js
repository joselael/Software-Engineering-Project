import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem,
  NavLink, Button, Table,
  Row, Col, Media } from 'reactstrap';
import '../../css/usertab.css';
import { projects } from '../../utils/Projects'
import store from '../../store'
import classnames from 'classnames'
import ProfileTab from './GeneralTab/ProfileTab'
import SettingsTab from './GeneralTab/SettingsTab'

export class DeveloperTab extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            projects: []
        }
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }
    componentDidMount() {
        projects()
        .then(({data}) => {
            var projects = data
            this.setState({
                projects: projects
            })
            console.log(this.state.projects)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
        <div>
            <Nav tabs>
            <NavItem>
                <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
                >
                Projects
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
                >
                Profile
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                className={classnames({ active : this.state.activeTab === '3'})}
                onClick={() => { this.toggle('3'); }}
                >
                Settings
                </NavLink>
            </NavItem>
            </Nav>
            <div className="activeTab">
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <Row>
                    <h4>Current Projects</h4>
                    <Table hover responsive striped>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </Table>
                    <h4>Past Project</h4>
                    <Table hover responsive striped>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </Table>
                </Row>
                </TabPane>
                <ProfileTab />
                <SettingsTab />
            </TabContent>
            </div>
        </div>
        );
    }
}
