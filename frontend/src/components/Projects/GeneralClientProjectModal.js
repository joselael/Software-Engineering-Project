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

export default class GeneralModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      link: false
    }
    this.toggleLink = this.toggleLink.bind(this)
  }

  toggleLink() {
    this.setState({
      link: !this.state.link
    })
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
        <td>BIDDING IN PROGRESS</td>
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
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    )
  }
}