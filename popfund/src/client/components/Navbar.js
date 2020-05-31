import React, { useState } from 'react';
import './Navbar.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import guestIcon from './guestIcon.png'
import guestIconWhite from './guestIconWhite.png'

const Navigation = (props) => {
    console.log(props);
    var userName;
    console.log(window.userName);
    if (! window.userName){
        userName = "Guest";
    }else{
        userName = window.userName;
    }
    console.log(userName)
    const [userMessage, setUserMessage] = useState(userName);  // Change this to "Welcome {username}" once user signs in 
    const [userImage, setUserImage] = useState(guestIconWhite);  // Change this to user profile image
    
    window.loading = () => {
        setUserMessage(window.userFname);
    };

    
    return (
        <Navbar className='color-nav' variant="dark">
            <Navbar.Brand href="/">popfund</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                    <Nav.Item className="iconArea">
                        <div>
                            <a href="/" className="removeLink">
                                {userMessage}
                                <img src={userImage} className="image" />
                            </a>
                        </div>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);
