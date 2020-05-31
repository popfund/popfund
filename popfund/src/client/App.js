/*
import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import BusinessList from './components/BusinessList'

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <h1>Welcome to popfund.</h1>
        <BusinessList />
      </div>
    );
  }
}
*/

import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navbar';
import Routes from './Routes';
import { render } from 'react-dom';

export default class App extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Routes />
      </div>
    )
  }
}
