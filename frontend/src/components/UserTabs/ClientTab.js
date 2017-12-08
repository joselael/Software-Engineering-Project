import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Table,
  Row,
  Col,
  Media,
  FormGroup,
  Input,
  Label,
  InputGroupAddon,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import '../../css/usertab.css';
import {myproject, createprojects} from '../../utils/Projects'
import ProjectModal from '../Projects/ClientProjectModal'
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
      details: "",
      date: "",
      title: "",
      max_budget: 0,
      modal: false,
      link: false,
      dev_username: "",
      rating: 1.5
    }

    this.toggleTab = this.toggleTab.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitProject = this.handleSubmitProject.bind(this)
    this.updateTable = this.updateTable.bind(this)
    this.checkFinished = this.checkFinished.bind(this)
    this.checkDone = this.checkDone.bind(this)
    this.clearStates = this.clearStates.bind(this)
    this.onStarClick = this.onStarClick.bind(this)
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  clearStates() {
    this.setState({
      summary: "",
      date: "",
      title: "",
      details: "",
      max_budget: 0,
    })
  }

  checkFinished(project) {
    return !project.completed
  }

  checkDone(project) {
    return project.completed
  }

  componentDidMount() {
    this.updateTable()
  }

  updateTable() {
    myproject(store.getState().user.username).then( (response) => {
      this.setState({
        projects: response.data
      })
    }).catch( (err) => {
      console.log(err)
    })
  }

  handleSubmitProject = event => {

    if (this.state.title === "search" || this.state.title === "projects"
    || this.state.title === "create" || this.state.title === "bid") {
      alert("Invalid project name")
      this.setState({
        title: ""
      })
    } else {
      createprojects(
        this.state.title,
        store.getState().user.username,
        this.state.summary,
        this.state.details,
        this.state.date,
        this.state.max_budget
      ).then( (response) => {
        console.log(response)
        alert("Submitting Project!!!")
        this.clearStates()
        this.updateTable()
        this.toggleModal()
      }).catch( (err) => {
        console.log(err)
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
    this.clearStates()
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
    this.clearStates()
  }

  render() {
    const biddingProjects = this.state.projects.
      filter(this.checkFinished)
      .map((project, index) =>
        <ProjectModal key={project._id} project={project} index={index}/>
    )

    const pastProjects = this.state.projects.
      filter(this.checkDone)
      .map((project, index) =>
        <tr key={project._id}>
          <td scope="row">{index + 1}</td>
          <td>{project.title}</td>
          <td>{project.mid_budget}</td>
          <td>{project.max_budget}</td>
          <td>
            <Button
              size="sm"
              color="primary"
              onClick={this.toggleLink}
            >
              Link
            </Button>
            <Modal isOpen={this.state.link} toggle={this.toggleLink}>
              <ModalHeader>
                {project.title}
              </ModalHeader>
              <ModalBody>
                <Label>Project Summary</Label>
                  <p className="modelP"> {project.summary} </p>
                <Label>Project Details</Label>
                  <p className="modelP">{project.details}</p>
                <div className="row">
                  <div className="col-md-6">
                  <Label>Bid Starts:</Label>
                    <p className="modelP">{project.bid_start}</p>
                  </div>
                    <div className="col-md-6">
                    <Label>Bid End:</Label>
                    <p className="modelP">{project.bid_end}</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <FormGroup>
                <select value={this.state.dev_username}
                  onChange={this.handleChange}
                  type="text"
                  name="dev_username"
                  className="form-control">
                  <option value="" disabled> Choose your user type </option>
                  <option value="developer"> Developer </option>
                  <option value="client"> Client </option>
                </select>
                </FormGroup>
                <Button color="danger" onClick={this.toggleLink}>
                  Choose
                </Button>
                <Button color="primary" onClick={this.toggleLink}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
    )
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '1'
            })}
              onClick={() => {
              this.toggleTab('1');
            }}>
              Projects
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '2'
            })}
              onClick={() => {
              this.toggleTab('2');
            }}>
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
              active: this.state.activeTab === '3'
            })}
              onClick={() => {
              this.toggleTab('3');
            }}>
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <div className="activeTab">
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row/>
              <Row>
                <Button color="primary" onClick={this.toggleModal}>
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
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}/>
                      <Label>Summary of Project</Label>
                      <Input
                        placeholder="Summary of Project"
                        type="textarea"
                        name="summary"
                        bsSize="sm"
                        value={this.state.summary}
                        onChange={this.handleChange}/>
                      <Label>Details of Project</Label>
                      <Input
                        placeholder="Details of Project"
                        type="textarea"
                        name="details"
                        bsSize="sm"
                        value={this.state.details}
                        onChange={this.handleChange}/>
                      <Label>Date of End</Label>
                      <Input
                        type="date"
                        name="date"
                        placeholder="date placeholder"
                        onChange={this.handleChange}
                        value={this.state.date}/>
                      <Label>Max Budget</Label>
                      <InputGroup>
                        <InputGroupAddon>$</InputGroupAddon>
                        <Input
                          value={this.state.max_budget}
                          name="max_budget"
                          type="number"
                          onChange={this.handleChange}/>
                      </InputGroup>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmitProject}>
                      Create Project
                    </Button>
                    <Button color="secondary" onClick={this.toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Row>
              <Row>
                <h4>Bidding Projects</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
                      <th>Max Budget</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biddingProjects}
                  </tbody>
                </Table>
                <h4>Current Projects</h4>
                <Table hover responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Project Name</th>
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
                      <th>Max Budget</th>
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

        <div>
          <h2>Rating from state: {this.state.rating}</h2>
            <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.rating}
                onStarClick={this.onStarClick.bind(this)}

            />
        </div>

        <div>
          <h2>Rating from state: {this.state.rating}</h2>
          <StarRatingComponent
              name="rate2"
              editing={false}
              starCount="5"
              value={this.state.rating}
          />
        </div>

      </div>
    );
  }
}
