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
  Label
} from 'reactstrap';
import '../css/project.css'

class Project extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      bid: 0
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    return (
      <div className="Project">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <CardTitle>
                  {this.props.project.title}
                </CardTitle>
                <CardText>
                  {this.props.project.summary}
                </CardText>
              </CardBody>
              <Button onClick={this.toggleModal}>
                Expand for more details
              </Button>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>{this.props.project.title}
                </ModalHeader>
                <ModalBody>
                  <Label>Project Summary</Label><br/>
                  {this.props.project.summary}<br/>
                  <Label>Bid Start Date</Label><br/>
                  {this.props.project.bid_start}<br/>
                  <Label>Bid End Date</Label><br/>
                  {this.props.project.bid_end}<br/>
                  <Label>Enter Bid</Label>
                  <Input
                    autofocus
                    type="number"                    
                    name="bid"
                    value={this.state.bid}
                    onChange={this.handleChange}
                    placeholder="Enter Bid"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.handleSubmitProject}>
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

export default Project;