import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';
import store from '../../store'
import '../../css/project.css'
import {bid} from '../../utils/Projects'

export default class Project extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false,
      bid: 0,
      description: ""
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitBid = this.handleSubmitBid.bind(this)
  }

  handleSubmitBid = event => {
    bid(this.props.project._id, store.getState().user.username,
    this.state.bid, this.state.description)
      .then( (response) => {
        console.log(response)
        this.toggleModal()
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {

    var truncateStyle = {
      width: "100%"
    }

    return (
      <div className="Project">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <CardTitle>
                  {this.props.project.title}
                </CardTitle>
                {store.getState().user.user_type === "client"? //if user is client, display more than one line of summary, since client dont have the expand for more details button
                <CardText className = "module">
                  {this.props.project.summary}
                </CardText>
                  :
                <CardText className="truncate" style={truncateStyle}>
                 {this.props.project.summary}
                </CardText>
                }
              </CardBody>
              {store.getState().user.user_type === "developer" ?
              <Button onClick={this.toggleModal}>
                Expand for more details
              </Button> : null
              }
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>{this.props.project.title}
                </ModalHeader>
                <ModalBody>
                  <Label>Client Name </Label>
                    <p className="modelP"> {this.props.project.author}</p>
                  <Label>Project Summary</Label>
                    <p className="modelP"> {this.props.project.summary} </p>
                  <Label>Project Details</Label>
                    <p className="modelP">{this.props.project.details}</p>
                  <Label> Maximum Budget</Label>
                    <p className="modelP">$ {this.props.project.max_budget}</p>
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
                  <Label>Enter Message</Label>
                  <Input
                    autoFocus
                    type="textarea"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Enter description"
                  />
                  <Label>Enter Bid</Label>
                  <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <Input
                      type="number"
                      name="bid"
                      value={this.state.bid}
                      onChange={this.handleChange}
                      placeholder="Enter Bid"
                    />
                  </InputGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleSubmitBid}>
                    Submit Bid
                  </Button>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};
