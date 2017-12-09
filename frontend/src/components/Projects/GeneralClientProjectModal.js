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
import {updateProject} from '../../utils/Projects'

export default class GeneralModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: false,
      rating_assignee: 0
    }
    this.toggleLink = this.toggleLink.bind(this)
    this.submitRating = this.submitRating.bind(this)
    this.onStarClick = this.onStarClick.bind(this)
  }

  toggleLink() {
    this.setState({
      link: !this.state.link
    })
  }

  submitRating() {
    var data = {}
    data.rating_assignee = this.state.rating_assignee
    console.log(data)
    updateProject(this.props.project._id, data)
      .then( (response) => {
        console.log(response)
        this.toggleLink()
        this.props.updateTable()
      })
      .catch( (err) => {
        console.log(err)
      })
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating_assignee: nextValue})
  }

  render() {

    var status = ""

    if(this.props.project.require_rating)
      status = "REQUIRE RATING"

    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.project.title}</td>
        <td>{this.props.project.max_budget}</td>
        <td>FINSHED</td>
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
              <div className="row">
                <div className="col-md-6">
                <Label>Assignee:</Label>
                  <div className="modelP">{this.props.project.assignee.username}</div>
                </div>
                  <div className="col-md-6">
                  <Label>Rating by Client:</Label>
                  <div className="modelP">
                  <StarRatingComponent name="rating_author" editing={false} 
                  starCount={5} value={this.props.project.rating_author}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                <Label>Client:</Label>
                  <div className="modelP">{this.props.project.author}</div>
                </div>
                <div className="col-md-6">
                  <Label>Rating by Developer:</Label>
                  {
                    this.props.project.rating_assignee === 0 ?
                    <div className="modelP">
                      <StarRatingComponent name="rating_assignee" editing={true} 
                        starCount={5} value={this.state.rating_assignee}
                        onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                      :
                    <div className="modelP">
                      <StarRatingComponent name="rating_assignee" editing={false} 
                        starCount={5} value={this.props.project.rating_assignee}/>
                    </div>
                  }
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {
                this.props.project.rating_assignee === 0 ?
                  <Button
                    onClick={this.submitRating}
                  >
                    Submit Rating
                  </Button> : null
              }
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    )
  }
}