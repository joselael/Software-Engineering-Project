import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import Project from './Project'
import '../css/search.css'

const projects = [
    {
        id: 1,
        name: "Project 1",
        details: "THIS PROJECT ROCKS",
        currentBid: 50
    },
    {
        id: 2,
        name: "Project 2",
        details: "THIS PROJECT ROCKS",
        currentBid: 100
    },
    {
        id: 3,
        name: "Project 3",
        details: "THIS PROJECT ROCKS",
        currentBid: 200
    },
    {
        id: 4,
        name: "Project 4",
        details: "THIS PROJECT ROCKS",
        currentBid: 300
    },
    {
        id: 5,
        name: "Project 5",
        details: "THIS PROJECT ROCKS",
        currentBid: 4000
    }
]

class SearchProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            projects: projects
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