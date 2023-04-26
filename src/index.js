import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";
import Contact from "./views/contact";
import { Register } from "./views/register";
import TEST from "./views/test";
import Home from "./views/home";
import { Login } from "./views/login";
import Competitions from "./views/competitions";
import About from "./views/about";
import AdminHome from "./views/admin-home";
import { AdminTeams } from "./views/admin-teams";
import AdminCompetitions from "./views/admin-competitions";
import { AdminProfile } from "./views/admin-profile";
import PlayerPortalHome from "./views/player-portal-home";
import PlayerPortalTeam from "./views/player-portal-team";
import PlayerPortalCompetitions from "./views/player-portal-competitions";
import PlayerPortalContact from "./views/player-portal-contact";
import { PlayerPortalProfile } from "./views/player-portal-profile";
import { ArenaProfile } from "./views/arena-profile";
import ArenaSubmissions from "./views/arena-submissions";
import ArenaLeaderboard from "./views/arena-leaderboard";
import ArenaTeam from "./views/arena-team";
import ArenaMain from "./views/arena-main";

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
        <Route component={AdminHome} exact path="/admin-home" />
        <Route component={AdminTeams} exact path="/admin-teams" />
        <Route component={AdminCompetitions} exact path="/admin-competitions" />
        <Route component={AdminProfile} exact path="/admin-profile" />
        <Route component={PlayerPortalHome} exact path="/player-portal-home" />
        <Route component={PlayerPortalTeam} exact path="/player-portal-team" />
        <Route
          component={PlayerPortalCompetitions}
          exact
          path="/player-portal-competitions"
        />
        <Route
          component={PlayerPortalContact}
          exact
          path="/player-portal-contact"
        />
        <Route
          component={PlayerPortalProfile}
          exact
          path="/player-portal-profile"
        />
        <Route component={ArenaProfile} exact path="/arena-profile" />
        <Route component={ArenaSubmissions} exact path="/arena-submissions" />
        <Route component={ArenaLeaderboard} exact path="/arena-leaderboard" />
        <Route component={ArenaTeam} exact path="/arena-team" />
        <Route component={ArenaMain} exact path="/arena-main" />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
