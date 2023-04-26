import React from 'react'
import { Link } from 'react-router-dom'
import DataGrid from "../components/datagridArenaLeaderboard";
import axios from "axios";
import './arena-leaderboard.css'

// gets number test cases and team name to generate table
function getNoTests(comp_id, user_id) {
  const [noTests, setNoTests] = React.useState(0);
  const [myTeam, setMyTeam] = React.useState("");

  React.useEffect(() => {
  axios
      .get("http://localhost:3002/api/get/compTeamDeatils/" + comp_id + "/" + user_id)
      .then(function(response){
        setNoTests(response.data[0].no_testcases);
        setMyTeam(response.data[0].team_name);
      });
  }, []);
  return [noTests, myTeam];
}

// used to generate the table with correct data
function GenGrid(params) {
  const [rows, setData] = React.useState([]);
  var sum = 0;
  // TODO: #5 #4 Change API call to get correct info from db
  
  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/leaderboard/" + params.compID)
      .then((response) => {
        const data = response.data.map((data, index) => {
          const newData = {
            id: index + 1,
            team_rank: index + 1,
            team_name: data.team_name,
            team_location: data.team_location ? data.team_location : "",
            team_score: 0
          };
          // Iterate through the key-value pairs of testcase_highest
          for (const [key, value] of Object.entries(JSON.parse(data.testcase_highest))) {
            // Dynamically create fields with key as field name and value as field value
            newData[key] = value;
            sum += value;
          }
          newData.team_score = sum;
          sum = 0;

          return newData;
        });
        setData(data);
      });
  }, []);
  return <DataGrid rows={rows} noTests={params.no} myTeam={params.team} pageSize={5} />
}

const ArenaLeaderboard = (props) => {
  const compID = sessionStorage.getItem('CompID');
  const userID = sessionStorage.getItem('userID');
  const [noTests, myTeam] = getNoTests(compID, userID);

  return (
    <div className="arena-leaderboard-container">
      <div data-role="Header" className="arena-leaderboard-navbar-container">
        <div className="arena-leaderboard-navbar">
          <div className="arena-leaderboard-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="arena-leaderboard-image"

            />
            <div
              data-role="BurgerMenu"
              className="arena-leaderboard-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
              <Link to="/player-portal-competitions" className="arena-back-link">
                  <svg viewBox="0 0 1024 1024" className="arena-main-icon2">
                      <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
                  </svg>
              </Link>
            <div className="arena-leaderboard-links-container">
              <Link to="/arena-main" className="arena-main-link">
                ARENA
              </Link>
              <Link to="/arena-submissions" className="arena-leaderboard-link">
                Submissions
              </Link>
              <Link
                to="/arena-leaderboard"
                className="arena-leaderboard-link1 Anchor"
              >
                lEADERBOARD
              </Link>
              <Link
                to="/arena-team"
                className="arena-leaderboard-link2 Anchor"
              >
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-leaderboard-container1">
            <Link
              to="/arena-profile"
              className="arena-leaderboard-navlink"
            >
              <svg viewBox="0 0 1024 1024" className="arena-leaderboard-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-leaderboard-mobile-menu">
            <div className="arena-leaderboard-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-leaderboard-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-leaderboard-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="arena-leaderboard-icon6"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-leaderboard-links-container1">
              <Link to="/arena-submissions" className="arena-team-link">
                SUBMISSIONS
              </Link>
              <Link to="/arena-leaderboard" className="arena-team-link1 Anchor">
                LEADERBOARD
              </Link>
              <Link to="/arena-teams" className="arena-team-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-container">
        <GenGrid no={noTests} team={myTeam} compID={compID}/>
      </div>
    </div>
  )
}

export default ArenaLeaderboard
