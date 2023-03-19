import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";
import Contact from "./views/contact";
import Register from "./views/register";
import TEST from "./views/test";
import Home from "./views/home";
import Login from "./views/login";
import Competitions from "./views/competitions";
import About from './views/about'

const App = () => {
  return (
    <Router>
      <div>
        <Route component={Contact} exact path="/contact" />
        <Route component={Register} exact path="/register" />
        <Route component={TEST} exact path="/test" />
        <Route component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={Competitions} exact path="/competitions" />
        <Route component={About} exact path="/about" />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
