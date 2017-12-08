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
import {getbid, submitAssignee} from '../../utils/Projects'

export default class ProjectModal extends Component {

  constructor(props) {

    super(props)
    this.state = {
      modal: false,
      developer: "",
      developer_id: "",
      nestedModal: false,
      closeAll: false,
      reasonForSelection: "",
      description: 0,
      bid_amount: 0,
      lowest_bid: Number.MAX_VALUE,
      bids: []
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleNested = this.toggleNested.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value}); //this requires each to have a name when used
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleNested() { //selected for more information
    //  alert("selected user for more information")
    this.setState({
      nestedModal: !this.state.nestedModal,
      description: this.state.bids[this.state.developer].description,
      bid_amount: this.state.bids[this.state.developer].amount,
      developer_id: this.state.bids[this.state.developer]._id
    });
  }

  toggleAll() {
    //alert("selected toggle all") //This is for when finalized selecting user
    if ((this.state.bid_amount != this.state.lowest_bid) && (this.state.reasonForSelection.length <= 0)) {
      alert("You need a reason why you didn't pick the lowest bidder!!!")
    } else {

      submitAssignee(this.props.project._id, this.state.developer_id, this.state.reasonForSelection)
        .then( (response) => {
          console.log(response)
        }).catch( (err) => {
          console.log(err)
        })
      this.setState({
        nestedModal: !this.state.nestedModal,
        modal: !this.state.modal,
      });
    }
  }

  componentDidMount() {
    for (var i = 0; i < this.props.project.bids.length; i++)
      getbid(this.props.project.bids[i])
        .then( (response) => {
          this.state.bids.push(response.data)
          if(response.data.amount < this.state.lowest_bid)
            this.setState({
              lowest_bid: response.data.amount
            })
    })
  }

  render() {

    const bidders = this.state.bids
      .map((bid, index) =>
        <option key={bid._id} value={index}>{bid.author}</option>
    )
    return(
      <tr>
        <td scope="row">{this.props.index + 1}</td>
        <td>{this.props.project.title}</td>
        <td>{this.props.project.max_budget}</td>
        <td>
          <Button
            size="sm"
            color="primary"
            onClick={this.toggleModal}
          >
            Link
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
            <ModalHeader>
              {this.props.project.title}
            </ModalHeader>
            <ModalBody>
              <Label>Project Summary</Label>
                <p className="modelP"> {this.props.project.summary} </p>
              <Label>Project Details</Label>
                <p className="modelP">{this.props.project.details}</p>
              <div className="row">
                <div className="col-md-6">
                <Label>Bid Starts:</Label>
                  <p className="modelP">{this.props.project.bid_start}</p>
                </div>
                  <div className="col-md-6">
                  <Label>Bid End:</Label>
                  <p className="modelP">{this.props.project.bid_end}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Input
                type="select"
                name="developer"
                value={this.state.developer}
                onChange={this.handleChange}>
                <option value="" disabled>Select the developer</option>
                {bidders}
              </Input>
              <ButtonGroup>
                <Button color="danger" onClick={this.toggleNested}>
                  More information
                </Button>

                <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                  <ModalHeader>"Developer's message"</ModalHeader>
                  <ModalBody style={{paddingLeft: "30px"}}>
                    <Row>{this.state.description}</Row>
                    <Row>Bid Amount: ${this.state.bid_amount}</Row>
                  </ModalBody>
                  <ModalFooter>
                    <Input placeholder="Reason for selection" 
                      value={this.state.reasonForSelection}
                      onChange={this.handleChange}
                      name="reasonForSelection"
                    />
                    <Button color="danger" onClick={this.toggleAll}>Select</Button>
                    <Button color="primary" onClick={this.toggleNested}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <Button color="primary" onClick={this.toggleModal}>
                  Cancel
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Modal>

        </td>
      </tr>
    )
  }
}
