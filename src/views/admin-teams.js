import React from 'react'
import { Link } from 'react-router-dom'
import DataGrid from "../components/datagridAdminTeams";
import axios from "axios";
import './admin-teams.css'

function GenGrid() {
  const [rows, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/admin_teams")
      .then((response) => {
        const data = response.data.map((data, index) => ({
          id: index + 1,
          team_code: data.team_code,
          user_id: data.user_id,
          team_name: data.team_name,
          team_score: data.team_score,
          competition_name: data.competition_name,
        }));
        setData(data);
      });
  }, []);

  return <DataGrid rows={rows} pageSize={5} />
}

const AdminTeams = (props) => {
  return (
    <div className="admin-teams-container">
      <div data-role="Header" className="admin-teams-navbar-container">
        <div className="admin-teams-navbar">
          <div className="admin-teams-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-teams-image"
            />
            <div data-role="BurgerMenu" className="admin-teams-burger-menu">
              <svg viewBox="0 0 1024 1024" className="admin-teams-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-teams-links-container">
              <Link to="/admin-competitions" className="admin-teams-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-teams-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-teams-container1">
            <Link to="/admin-profile" className="admin-teams-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-teams-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="admin-teams-mobile-menu">
            <div className="admin-teams-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-teams-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-teams-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="admin-teams-icon4">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-teams-links-container1">
              <Link to="/admin-home" className="admin-teams-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-teams-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-teams-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-container">
        <GenGrid />
      </div>
    </div>
  )
}

export {AdminTeams}
