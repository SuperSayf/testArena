import React from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { useState } from "react";
import TeamInputBox from '../components/TeamInputBox'
import { v4 as uuidv4 } from 'uuid';
import './player-portal-team.css'
const username = sessionStorage.getItem('username');
const userID = sessionStorage.getItem('userID');
const competition_id = sessionStorage.getItem('CompID');

const PlayerPortalTeam = (props) => {

  //useState variables

  //storing the code generated
  const [code, setCode] = useState("");
  const [teamName, setInputValue] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  //generate random code for team
  const randomString = () => {
    setDisabled(true);
    const code = uuidv4();
    setCode(code)
    console.log('Team code generated')
    console.log(code)
    console.log(teamName);
    return code;
  }

  /*
      ! CREATE TEAM
      1.Make sure that the field isn't empty
      2.verify that the name doesn't exist already
      3.Then add the team to the data base along with the unique code
  
  */

  const handleInputSubmit = (value) => {
    const teamName = value;
    console.log("Input value: ", teamName);
    if (teamName == "") {
      alert("Please enter a valid team name");
    }
    else {
      validationCreate(teamName);
    }
  };

  const createTeam = (teamName) => {
    const code = randomString();
    console.log(userID);
    console.log(competition_id);
    axios.post("http://localhost:3002/api/post/create/team", { user_id: userID, team_name: teamName, team_code: code, competition_id: competition_id });
    console.log(username)
  }

  const validationCreate = (teamName) => {
    axios
      .get("http://localhost:3002/api/get/doesTeamExist/" + teamName)
      .then(function (response) {
        const teamData = response.data;

        if (JSON.stringify(teamData) == "[]") {
          console.log("Team doesn't exist")
          createTeam(teamName)
        }
        else {
          console.log("team exists")
          alert("This team name is already taken");
        }

      });
  }

  /*
      ! JOIN TEAM
      1. Make sure the code is not empty
      2. Get the team name associated with the code, if none, throw error
      3. Add the user to the team
  */
  const handleInputSubmit2 = (value) => {
    const teamCode = value;
    console.log("Input value: ", teamCode);
    if (teamCode == "") {
      alert("Please enter a valid code");
    }
    else {
      validationCode(teamCode);
    }
  };


  const validationCode = (teamCode) => {
    axios
      .get("http://localhost:3002/api/get/codeBelongto/" + teamCode)
      .then(function (response) {
        const codeResponse = response.data;

        if (JSON.stringify(codeResponse) == "[]") {
          alert("Please enter a valid code");

        }
        else {
          joinTeam(codeResponse[0].team_name, teamCode);
        }

      });
  }

  const joinTeam = (teamName, teamCode) => {
    axios.post("http://localhost:3002/api/post/addTo/team", { user_id: userID, team_name: teamName, team_code: teamCode, competition_id: competition_id });
  }

  return (
    <div className="player-portal-team-container">
      <div data-role="Header" className="player-portal-team-navbar-container">
        <div className="player-portal-team-navbar">
          <div className="player-portal-team-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="player-portal-team-image"
            />
            <div
              data-role="BurgerMenu"
              className="player-portal-team-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="player-portal-team-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="player-portal-team-links-container">
              <Link to="/player-portal-home" className="player-portal-team-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-team-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-team-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-team-link3">
                <span className="Anchor">CONTACT US</span>
                <br></br>
              </Link>
            </div>
          </div>
          <div className="player-portal-team-container1">
            <Link to="/player-portal-profile" className="player-portal-team-navlink">
              <svg viewBox="0 0 1024 1024" className="player-portal-team-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="player-portal-team-mobile-menu"
          >
            <div className="player-portal-team-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="player-portal-team-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="player-portal-team-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="player-portal-team-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="player-portal-team-links-container1">
              <Link to="/player-portal-home" className="player-portal-team-link">
                HOME
              </Link>
              <Link to="/player-portal-competitions" className="player-portal-team-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/player-portal-team" className="player-portal-team-link2 Anchor">
                TEAM
              </Link>
              <Link to="/player-portal-contact" className="player-portal-team-link3">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="player-portal-team-section-separator"></div>
      <div className="player-portal-team-section-separator1"></div>
      <div className="player-portal-team-section-separator2"></div>
      <div className="player-portal-team-section-separator3"></div>
      <TeamInputBox
        title="Create a Team"
        label="Team Name"
        buttonText="Team Name"
        name="Create Team"
        disabled={disabled}
        onClick={handleInputSubmit}
        code={"Team Code: " + code}
      ></TeamInputBox>

      <br></br>
      <TeamInputBox
        title="Join a Team"
        label="Team Code"
        buttonText="Team Code"
        name="Join a Team"
        onClick={handleInputSubmit2}
      ></TeamInputBox>
    </div>
  )
}

export default PlayerPortalTeam
