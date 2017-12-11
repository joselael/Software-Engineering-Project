import React, { Component } from 'react'
import '../css/landing.css'
//import BarChart from 'react-bar-chart'
import {Col, Row} from 'reactstrap'
import {topClient, topDev, numberOfClients, numberOfDev} from '../utils/Users'
import defaultProfile from '../images/default_profile.png'
//import BarChart from 'react-d3'
import {totalProjects} from '../utils/Projects'
import {BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'

export default class LandingStatistics extends Component {
  constructor (props){
    super(props)
    this.state = {
      width: 400,
      top_dev: {},
      top_client: {},
      total_devs: 0,
      total_clients: 0,
      total_projects: 0
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
    
    totalProjects()
      .then( (response) => {
        this.setState({
          total_projects: response.data
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


  var imgClient = ""
  var imgDev = ""

  var imgClient = ""
  var imgDev = ""

  console.log(this.state.top_client)

  if(!this.state.top_client.picture)
    imgClient = defaultProfile  
  else
    imgClient = this.state.top_client.picture

  if(!this.state.top_dev.picture)
    imgDev = defaultProfile  
  else
    imgDev = this.state.top_dev.picture
  
    const data = [
      {name: 'Developers', Total: this.state.total_devs},
      {name: 'Clients', Total: this.state.total_clients},
      {name: 'Projects', Total: this.state.total_projects},
];
    /*
  const data = [
    {text: 'Developers', value: this.state.total_devs},
    {text: 'Clients', value: this.state.total_clients}
  ];
  */

    return(
      <Row>
      <br/>
        <Col xs="7">
        <Row style={{textAlign: 'center', justifyContent: 'center'}}>
          <BarChart width={600} height={500} data={data}
              margin={{top: 5, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="Total" fill="#8884d8" />
          </BarChart>
        </Row>
        </Col>
        <Col xs="3">
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <h2>Top Developer </h2>
          </Row>
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <img src={imgDev} style = {imageStyle}/>
          </Row>
          <Row style={{textAlign: 'center', color:'silver', justifyContent: 'center'}}>
            <h3>
              {this.state.top_dev.username}
            </h3>
          </Row>
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <h2>Top Client </h2>
          </Row>
          <Row style={{textAlign: 'center', color:'grey', justifyContent: 'center'}}>
            <img src={imgClient} style = {imageStyle}/>
          </Row>
          <Row style={{textAlign: 'center', color:'silver', justifyContent: 'center'}}>
            <h3> {this.state.top_client.username} </h3>
           </Row>
        </Col>
      </Row>
    )
  }
}
