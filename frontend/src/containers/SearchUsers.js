import React, {Component} from 'react'
import {FormGroup, Input, Label} from 'reactstrap'
import {projects} from '../utils/Projects'
import User from '../components/Users/User'
import '../css/searchusers.css'
import store from '../store'

export default class SearchUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: []
    }
    this.searchUpdate = this.searchUpdate.bind(this)
  }

  searchUpdate(event) {
    this.setState({search: event.target.value})
  }

  componentDidMount() {
    /*
    projects().then((response) => {
      this.setState({projects: response.data})
    }).catch((err) => {
      console.log(err)
    })
    */
  }

  render() {

    let filteredUsers = this.state.users
      .filter((project) => {
        return project
          .title
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1;
      });

    return (
      <div className="SearchUsers">
        <Label>Search Users</Label>
        <FormGroup>
          <Input
            placeholder="SEARCH ME!!!"
            onChange={this.searchUpdate}
            type="text"
            id="searchProject"/>
        </FormGroup>
        {filteredUsers.map((user) => {
          return <User user={user} key={user._id}/>
        })}
      </div>
    )
  }
}
