import React, { Component } from 'react'
import '../css/landing.css'
import BarChart from 'react-bar-chart'
import {Col, Row} from 'reactstrap'
import {topClient, topDev, numberOfClients, numberOfDev} from '../utils/Users'
import defaultProfile from '../images/default_profile.png'

export default class LandingStatistics extends Component {
  constructor (props){
    super(props)
    this.state = {
      width: 400,
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

    topClient()
      .then( (response) => {
        this.setState({
          top_client: response.data
        })
      })
      .catch( (err) => {
        console.log(err)
      })

    numberOfClients()
      .then( (response) => {
        this.setState({
          total_clients: response.data
        })
      })
      .catch( (err) => {
        console.log(err)
      })

    numberOfDev()
      .then( (response) => {
        this.setState({
          total_devs: response.data
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
      borderRadius: "50%",
      textAlign: 'center',
      justifyContent: 'center'
    }

  const data = [
    {text: 'Developers', value: this.state.total_devs},
    {text: 'Clients', value: this.state.total_clients}
  ];

  const margin = {
    top: 20, right: 20, bottom: 30, left: 40
  };

    return(
      <Row>
      <br/>
        <Col xs="7">
          <Row style={{textAlign: 'center', justifyContent: 'center'}}>
              <div style={{width: '30%', fill:'#85D1C5', stroke: 'silver'}}>
                  <BarChart ylabel='Statistics'
                    width={this.state.width}
                    height={500}
                    margin={margin}
                    data={data}/>
              </div>
          </Row>
        </Col>
        <Col xs="3">
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <h2>Top Developer </h2>
          </Row>
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <img src={defaultProfile} style = {imageStyle}/>
          </Row>
          <Row style={{textAlign: 'center', color:'silver', justifyContent: 'center'}}>
            <h3>
              {this.state.top_dev}
            </h3>
          </Row>
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <h2>Top Client </h2>
          </Row>
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <img src={defaultProfile} style = {imageStyle}/>
          </Row>
          <Row style={{textAlign: 'center', color:'silver', justifyContent: 'center'}}>
            <h3> {this.state.top_client} </h3>
           </Row>
        </Col>
      </Row>
    )
  }
}
