import React, { Component } from 'react';
import './Home.css';
import BusinessList from '../components/BusinessList'

export default class Home extends Component {

  render() {
    return (
      <div style={{ marginTop: '10%' }}>
        <BusinessList />
      </div>
    );
  }
}