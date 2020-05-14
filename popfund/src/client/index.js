/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignIn from './components/SignIn'

ReactDOM.render(<App />, document.getElementById('root'));
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

ReactDOM.render(    
    <Router> 
        <App />
    </Router>,
    document.getElementById('root')
);