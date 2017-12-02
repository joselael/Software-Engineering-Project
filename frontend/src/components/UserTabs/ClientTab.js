import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, 
    NavLink, Button, Table,
    Row, Col, Media,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import '../../css/usertab.css';
import { accounts, acceptUser, blacklistUser, deleteUser } from '../../utils/Users'
import store from '../../store'
import classnames from 'classnames'
import ProfileTab from './GeneralTab/ProfileTab'
import SettingsTab from './GeneralTab/SettingsTab'

export class ClientTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1',
            projects: [],
            modal: false
        }

        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
        }
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
        <div>
            <Nav tabs>
            <NavItem>
                <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggleTab('1'); }}
                >
                Projects
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggleTab('2'); }}
                >
                Profile
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                className={classnames({ active : this.state.activeTab === '3'})}
                onClick={() => { this.toggleTab('3'); }}
                >
                Settings
                </NavLink>
            </NavItem>
            </Nav>
            <div className="activeTab">
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                <Row>
                    <h4>
                        Current Projects
                    </h4>
                    <Button
                        color="primary"
                        onClick={this.toggleModal}>
                        Add Projects
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Modal Header
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                        </ModalHeader>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleModal}>
                                Do something
                            </Button>
                            <Button color="primary" onClick={this.toggleModal}>
                                Do something else
                            </Button>
                        </ModalFooter>
                    </Modal>
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
                        <th>User Type</th>
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