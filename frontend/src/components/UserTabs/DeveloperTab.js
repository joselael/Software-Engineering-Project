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
import ProjectModal from '../Projects/DeveloperProjectModal'

export class DeveloperTab extends Component {
    constructor(props) {
      super(props)
      this.state = {
          activeTab: '1',
          projects: []
      }
      this.toggle = this.toggle.bind(this);
      this.wonProjects = this.wonProjects.bind(this)
      this.updateTable = this.updateTable.bind(this)
    }

    updateTable() {
      projects()
        .then(({data}) => {
            var projects = data.filter(this.wonProjects)
            this.setState({
                projects: projects
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
      }
    }

    wonProjects(project) {
      return project.assignee.user_id === store.getState().user._id
    }

    componentDidMount() {
      this.updateTable()
    }

    render() {

      const Projects = this.state.projects
        .map((project, index) => 
        <ProjectModal updateTable={() => this.updateTable()} key={project._id} project={project} index={index}/>
      )

      console.log(this.state.projects)

      return ( 
        <div> 
          <Nav tabs> 
            <NavItem> 
              <NavLink 
              className={classnames({ active: this.state.activeTab === '1' })} 
              onClick={() => { this.toggle('1'); }} > 
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
            <br/>
                <TabPane tabId="1">
                <Row>
                  <h4>Current Projects</h4>
                  <Table hover responsive striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Projects}
                    </tbody>
                  </Table>
                  <h4>Past Project</h4>
                  <Table hover responsive striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Status</th>
                        <th>Link</th>
                      </tr>
                    </thead>
                  <tbody>
                  </tbody>
                  </Table>
                </Row>
                </TabPane>
                <ProfileTab tabId={"2"}/>
                <SettingsTab tabId={"3"}/>
            </TabContent>
            </div>
        </div>
      );
    }
}