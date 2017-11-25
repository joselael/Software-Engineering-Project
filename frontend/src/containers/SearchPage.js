import React, { Component } from "react";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
            
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="Signin">
      </div>
    )
  }
}

export default SearchPage;