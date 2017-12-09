import React, { Component } from 'react'
import '../css/landing.css'
import BarChart from 'react-bar-chart'
import {Col, Row} from 'reactstrap'
import {topClient, topDev, total_clients, total_devs} from '../utils/Users'

const data = [
  {text: 'Developers', value: 5},
  {text: 'Clients', value: 3},
  {text: 'Projects', value: 1}
];

const margin = {
  top: 20, right: 20, bottom: 30, left: 40
};

export default class LandingStatistics extends Component {
  constructor (props){
    super(props)
    this.state = {
      width: 600,
      top_dev: "",
      top_client: "",
      total_devs: 0,
      total_clients: 0
    }
  }

  componentDidMount() {
    topDev()
      .then( (response) => {
        this.setState({
          top_dev: response.data
        })
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  render() {
    return(
      <Row>
      <br/>
        <Col xs="6">
          <div ref='root'>
              <div style={{width: '50%', fill:'#258e8e', stroke: 'grey'}}>
                  <BarChart ylabel='Statistics'
                    width={this.state.width}
                    height={500}
                    margin={margin}
                    data={data}/>
              </div>
          </div>
        </Col>
        <Col xs="6" style={{textAlign: 'center', color:'grey'}}>
          <Row>
            <h1>Top Developer </h1>
          </Row>
          <br/>
          <Row>
            <h1>Top Client </h1>
          </Row>
        </Col>
      </Row>
    )
  }
}
