import React, { Component } from "react";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import SignIn from "./components/SignIn"

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={SignIn} />
                </Switch>
            </BrowserRouter>
        )
    }
}