import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Table,
  Row,
  Col,
  Media,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Card,
  Badge,
  Input,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import defaultProfile from '../../../images/default_profile.png'
import store from '../../../store'
import {pictureUpload, updateSettings} from '../../../utils/Users'
import {userInfo} from '../../../utils/Auth'

export default class ProfileTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      image: null,
      imageOpen: false
    }
    this.toggleImage = this.toggleImage.bind(this)
    this.submitImg = this.submitImg.bind(this)
  }

  toggleImage() {
    this.setState({imageOpen: !this.state.imageOpen})
  }

  handleFileChange = e => {
    this.setState({image: e.target.files[0]})
  }

  submitImg() {
    this.toggleImage()
    const img = this.state.image
    //Upload picture
    pictureUpload(store.getState().token, img)
      .then( (response) => {
        console.log(response)
        alert("Submitting image...")
        //Reload user info in redux
        var data = {}
        data.picture = response.data
        updateSettings(store.getState().token, data)
          .then( (response) => {
            console.log(response)
            userInfo(store.getState().token)
          })
          .catch( (err) => {
            console.log(err)
          })
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  render() {
    var imageStyle = {
      width: "100px",
      height: "100px",
      borderRadius: "50%"
    }

    var pictureURL = store.getState().user.picture
    if (!store.getState().user.picture)
      pictureURL = defaultProfile
    else 
      pictureURL = store.getState().user.picture

    return (
      <TabPane tabId={this.props.tabId} className="Profile-Tab">
      <br/>
        <Row>
          <Col sm="2">
            <Media style={{display: 'flex', justifyContent: 'center'}}>
              <Media left href="#">
                <Media object src={pictureURL} style={imageStyle}/>
              </Media>
            </Media>
            <Media body>
            <br/>
              <Media heading style={{display: 'flex', justifyContent: 'center'}}>
                {store.getState().user.first_name} {store.getState().user.last_name.value}
              </Media>
              <div style={{display: 'flex', justifyContent: 'center'}}>
              {store.getState().user.user_type}
              </div>
            </Media>
            <Button onClick={this.toggleImage}>Upload Img</Button>
            <Modal toggle={this.toggleImage} isOpen={this.state.imageOpen}>
              <ModalBody>
              </ModalBody>
                <Input type="file" name="image" id="resume" onChange={this.handleFileChange} />
              <ModalFooter>
                <Button
                  onClick={this.submitImg}
                >
                  Submit
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
          <Col md={{size: 8}}>
            <Card>
              <CardHeader>Username 
                <Badge color="danger"> {store.getState().user.warnings}</Badge>
              </CardHeader>
              <CardBody>
                <CardText>
                  {store.getState().user.username}
                </CardText>
              </CardBody>
            </Card>
            <br/>
            <Card>
              <CardHeader>Email</CardHeader>
              <CardBody>
                <CardText>
                  {store.getState().user.email.value}
                </CardText>
              </CardBody>
            </Card>
            <br/>
            {store.getState().user.user_type === "admin" ? null:
            <div>
              <Card>
                <CardHeader>LinkedIn</CardHeader>
                <CardBody>
                  <CardText>
                    {store.getState().user.linkedIn.value}
                  </CardText>
                </CardBody>
              </Card>
              <br/>
              <Card>
                <CardHeader>Github
                </CardHeader>
                <CardBody>
                  <CardText>
                    {store.getState().user.github.value}
                  </CardText>
                </CardBody>
              </Card>
              <br/>

              <Card>
                <CardHeader>Resume</CardHeader>
                <CardBody>
                  <CardText>
                    <NavLink href={store.getState().user.resume}>
                      Resume
                    </NavLink>
                  </CardText>
                </CardBody>
              </Card>
              <br/>

              <Card>
                <CardHeader>Rating and Project Count</CardHeader>
                <CardBody>
                  <StarRatingComponent
                    name="rating"
                    editing={false}
                    starCount={5}
                    value={store.getState().user.average_rating}/>
                  <CardText>
                    Rating: {store.getState().user.average_rating}| Project Count: {store.getState().user.project_count}
                  </CardText>
                </CardBody>
              </Card>
              <br/>
            </div>
          }
          <Card body inverse color="success" >
            <CardTitle>Current Balance</CardTitle>
              <CardText> $
                {store.getState().user.account_balance}
              </CardText>
          </Card>
          <br/>
          </Col>

        </Row>
      </TabPane>
    )
  }
}
