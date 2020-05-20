import React, { Component } from 'react';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { Box } from '@material-ui/core';
import Truncate from 'react-truncate'
import './BusinessPage.css'
import Experiment from './experimental.js'

class BusinessList extends Component {

  //renderBusiness = (business, idx) => {

  //}

  //<title> {businessName} </title>
  // <h1 style={{textAlign: 'center'}}> {businessName} </h1>
  // <h2 style={{textAlign: 'center'}}> {businessInfo} </h2>
  // <p style={{textAlign: 'center'}}> {needs} </p>
  // <img style={{width:300, height: 300, objectFit: "cover", borderRadius: 10}}
  //     src={imageId}
  // alt="Business picture" class="center"/>
  render() {
  return (
    <div>
        <Experiment />
    </div>
  );
}
}



let businessName = 'Chipotle'
let businessInfo = 'Our mission is to provide food with integrity.'
let needs = "We are currently open from 10am until 2pm, so please come and order to-go so that we can pay our workers."
let imageId = "https://images.pexels.com/photos/20785/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"


export default BusinessList;
