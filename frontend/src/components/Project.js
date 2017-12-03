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
  Button
} from 'reactstrap';
import '../css/project.css'

class Project extends Component {
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
              <Button>
                Expand for more details
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Project;