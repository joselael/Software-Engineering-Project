import React, {Component} from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row
} from 'reactstrap';
import '../css/project.css'

class Project extends Component {
  render() {
    return (
      <div className="Project">
        <Row>
          <Col sm="6">
            <Card>
              <CardBody>
                <CardTitle>
                  {this.props.project.name}
                </CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
              </CardBody>
              <CardImg
                width="100%"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                alt="Card image cap"/>
              <CardBody>
                <CardText>
                  {this.props.project.details}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardBody>
                <CardTitle>
                  {this.props.project.name}
                </CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
              </CardBody>
              <CardImg
                width="100%"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                alt="Card image cap"/>
              <CardBody>
                <CardText>
                  {this.props.project.details}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Project;