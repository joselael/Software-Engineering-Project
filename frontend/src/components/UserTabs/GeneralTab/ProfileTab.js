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
  Badge
} from 'reactstrap';
import defaultProfile from '../../../images/default_profile.png'
import store from '../../../store'

export default class ProfileTab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
  }
  render() {
    var imageStyle = {
      width: "100px",
      height: "100px",
      borderRadius: "50%"
    }
    return (
      <TabPane tabId={this.props.tabId} className="Profile-Tab">
      <br/>
        <Row>
          <Col sm="2">
            <Media style={{display: 'flex', justifyContent: 'center'}}>
              <Media left href="#">
                <Media object src={defaultProfile} style={imageStyle}/>
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

          </Col>
          <Col sm="12" md={{size: 8}}>
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
