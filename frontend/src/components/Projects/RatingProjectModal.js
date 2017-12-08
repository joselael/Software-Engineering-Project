import React, {Component} from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
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
import StarRatingComponent from 'react-star-rating-component'
import {submitRating} from '../../utils/Projects'

export default class RatingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: false,
      rating: 0,
      comments: "",
      link2: false,
      data: {}
    }
    this.toggleLink = this.toggleLink.bind(this)
    this.onStarClick = this.onStarClick.bind(this)
    this.toggleComments = this.toggleComments.bind(this)
    this.handleSubmitRating = this.handleSubmitRating.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitComments = this.handleSubmitComments.bind(this)
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue})
  }

  toggleLink() {
    this.setState({
      link: !this.state.link
    })
  }

  toggleComments() {
    this.setState({
      link2: !this.state.link2
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitRating() {
    if(this.state.rating < 3)
      this.toggleComments()
    else {

      this.state.data.rating_author = this.state.rating
      this.state.data.require_rating = false

      submitRating(this.props.project._id, this.state.data)
        .then( (response) => {
          console.log(response)
        })
        .catch( (err) => {
          console.log(err)
        })
    }
  }

  handleSubmitComments() {

  }

  render() {

    var status = ""

    if(this.props.project.require_rating)
      status = "REQUIRE RATING"
    else if(this.props.project.require_review)
      status = "UNDER REVIEW"

    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.project.title}</td>
        <td>{this.props.project.max_budget}</td>
        <td>{status}</td>
        <td>
          <Button
            size="sm"
            color="primary"
            onClick={this.toggleLink}
          >
            Link
          </Button>
          <Modal isOpen={this.state.link} toggle={this.toggleLink}>
            <ModalHeader toggle={this.toggleLink}>{this.props.project.title}
            </ModalHeader>
            <ModalBody>
              <Label>Project Summary</Label>
                <p className="modelP"> {this.props.project.summary} </p>
              <Label>Project Details</Label>
                <p className="modelP">{this.props.project.details}</p>
              <div className="row">
                <div className="col-md-6">
                <Label>Bid Starts:</Label>
                  <div className="modelP">{this.props.project.bid_start}</div>
                </div>
                  <div className="col-md-6">
                  <Label>Bid End:</Label>
                  <div className="modelP">{this.props.project.bid_end}</div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <StarRatingComponent
                name="project_rate"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)}
              />
              <ButtonGroup>
                <Button
                  color="success"
                  onClick={this.handleSubmitRating}
                >
                  Submit
                </Button>
                <Button
                  onClick={this.toggleLink}
                >
                  Cancel
                </Button>
              </ButtonGroup>
              <Modal isOpen={this.state.link2} toggle={this.toggleComments}>
                <ModalHeader>Why such a bad rating?</ModalHeader>
                <ModalBody>
                  <Input
                    type="textarea"
                    name="comments"
                    value={this.state.comments}
                    onChange={this.handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <ButtonGroup>
                    <Button
                      color="danger"
                      onClick={this.handleSubmitRating}
                    >
                      Submit
                    </Button>
                    <Button>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </Modal>
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    )
  }
}