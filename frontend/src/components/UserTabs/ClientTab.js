import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, 
    NavLink, Button, Table,
    Row, Col, Media, FormGroup, Input, Label,
    InputGroupAddon, InputGroup,
    Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import '../../css/usertab.css';
import { createprojects } from '../../utils/Projects'
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
            summary: "",
            date: "",
            project_name: "",
            min_budget: 0,
            max_budget: 0,
            modal: false
        }

        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                    <Row />
                    <Row>
                        <Button
                            color="primary"
                            onClick={this.toggleModal}>
                            Add Projects
                        </Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Create a project today!
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label>Project Name</Label>
                                    <Input
                                        placeholder="Awesome Project Name"
                                        type="text"
                                        name="project_name"
                                        value={this.state.project_name}
                                        onChange={this.handleChange}
                                    />
                                    <Label>Summary of Project</Label>
                                    <Input
                                        placeholder="Summary of Project"
                                        type="textarea"
                                        name="summary"
                                        bsSize="sm"
                                        value={this.state.summary}
                                        onChange={this.handleChange}
                                    />
                                    <Label>Date of End</Label>
                                    <Input
                                        type="date"
                                        name="date"
                                        placeholder="date placeholder"
                                        onChange={this.handleChange}
                                        value={this.state.date}
                                    />
                                    <Label>Min Budget</Label>
                                    <InputGroup>
                                        <InputGroupAddon>$</InputGroupAddon>
                                        <Input
                                            value={this.state.min_budget}                                        
                                            name="min_budget"
                                            type="number"
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <Label>Max Budget</Label>
                                    <InputGroup>
                                        <InputGroupAddon>$</InputGroupAddon>
                                        <Input
                                            value={this.state.max_budget}
                                            name="max_budget"
                                            type="number"
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal}>
                                    Create Project
                                </Button>
                                <Button color="secondary" onClick={this.toggleModal}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </Row>
                    <Row>
                        <h4>Current Projects</h4>
                        <Table hover responsive striped>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Project Name</th>
                                <th>Min Budget</th>
                                <th>Max Budget</th>
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
                                <th>Min Budget</th>
                                <th>Max Budget</th>
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
