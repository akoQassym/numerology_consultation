import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, useParams } from "react-router-dom";

//Landing
import Landing from "./landing/MainFile";

// Auth
import Login from "./auth/LoginForm";
import Register from "./auth/SignupForm";

//Workplace
import Profile from "./workplace/Profile";
import Consultations from "./workplace/Consultations";
import Settings from "./workplace/Settings";

//Error
import NotFoundPage from "./error/MainFile";
import SmthWentWrong from "./error/SmthWentWrong";

// Admin
import Admin from "./admin/MainFile";

import Lol from "./workplace/lol";
import perfectMoney from "./workplace/perfectMoney";


export default function Pages() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/p=:parent" children={<Parent />} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/consultations" component={Consultations} />
                <Route path="/settings" component={Settings} />
                <Route path="/404" component={NotFoundPage} />
                <Route path="/wrong" component={SmthWentWrong} />
                <Route path="/adminPanel" component={Admin} />
                
                <Route path="/lol" component={Lol} />
                <Route path="/perfectMoney" component={perfectMoney} />

                <Redirect to="/404"/>
            </Switch>
        </Router>
    )
}

function Parent() {
    let { parent } = useParams();
    localStorage.clear();
    localStorage.setItem('parent', parent);
    return (
        <Redirect to='/' />
    ) 
}