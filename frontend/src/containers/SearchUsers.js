import React, {Component} from 'react'
import {FormGroup, Input, Label, Table} from 'reactstrap'
import {searchUser} from '../utils/Users'
import User from '../components/Users/User'
import '../css/searchusers.css'
import store from '../store'
import axios from 'axios'

export default class SearchUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: []
    }
    this.searchUpdate = this.searchUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  searchUpdate(event) {

    const name = this.state.search
    searchUser(name)
      .then( (response) => {
        this.setState({
          users: [response.data]
        })
        console.log(this.state.users)
      })
      .catch( (err) => {
        console.log(err)
      })
    event.preventDefault()
  }

  render() {

    const users = this.state.users
      .map( (user, index) => <User user={user} index={index} key={user.username}/>)

    return (
      <div className="SearchUsers">
        <Label>Search Users</Label>
        <form onSubmit={this.searchUpdate}>
        <FormGroup>
          <Input
            placeholder="SEARCH ME!!!"
            value={this.state.search}
            onChange={this.handleChange}
            type="text"
            name="search"
            id="searchProject"/>
        </FormGroup>
        </form>
        <Table hover responsive striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>LinkedIn</th>
              <th>Github</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    )
  }
}
