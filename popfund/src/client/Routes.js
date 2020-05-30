import React, { Component } from "react";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import BusinessPage from "./components/BusinessPage"
import DonatePage from "./components/DonatePage"

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/businessPage" component={BusinessPage} />
                    <Route path="/donatePage" component={DonatePage} />
                </Switch>
            </BrowserRouter>
        )
    }
}
