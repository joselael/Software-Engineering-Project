import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import Project from './Project'
import '../css/search.css'

class SearchProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            projects: []
        }
        this.searchUpdate = this.searchUpdate.bind(this)
    }

    searchUpdate(event) {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        let filteredProjects = this.state.projects.filter(
            (project) => {
                return project.name.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
            }
        );
        return(
            <div className="SearchProjects">
                <FormGroup>
                    <Input 
                        placeholder="SEARCH ME!!!"
                        onChange={this.searchUpdate}
                        type="text"
                        id="searchProject"
                    >
                    </Input>
                </FormGroup>
                {
                    filteredProjects.map((project)=> {
                        return <Project project={project} 
                            key={project.id} 
                        />
                    })
                }
            </div>
        )
    }

}

export default SearchProjects