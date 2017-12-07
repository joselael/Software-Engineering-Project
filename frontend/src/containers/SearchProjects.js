import React, {Component} from 'react'
import {FormGroup, Input} from 'reactstrap'
import {projects} from '../utils/Projects'
import Project from '../components/Projects/Project'
import '../css/search.css'
import store from '../store'

export default class SearchProjects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      projects: []
    }
    this.searchUpdate = this
      .searchUpdate
      .bind(this)
  }

  searchUpdate(event) {
    this.setState({search: event.target.value})
  }

  componentDidMount() {
    projects().then((response) => {
      this.setState({projects: response.data})
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {

    let filteredProjects = this
      .state
      .projects
      .filter((project) => {
        return project
          .title
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1;
      });

    return (
      <div className="SearchProjects">
        <FormGroup>
          <Input
            placeholder="SEARCH ME!!!"
            onChange={this.searchUpdate}
            type="text"
            id="searchProject"/>
        </FormGroup>
        {filteredProjects.map((project) => {
          return <Project project={project} key={project._id}/>
        })}
      </div>
    )
  }
}
