import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react";
import TeamManager from '../components/team-manager'

import './arena-team.css'

const ArenaTeam = (props) => {


  const [disabled, setDisabled] = useState(false);

  const handleInputSubmit = () => {
    console.log("Input value: Hello");
  }


  return (
    <div className="arena-team-container">
      <div data-role="Header" className="arena-team-navbar-container">
        <div className="arena-team-navbar">
          <div className="arena-team-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="arena-team-image"
            />
            <div data-role="BurgerMenu" className="arena-team-burger-menu">
              <svg viewBox="0 0 1024 1024" className="arena-team-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
              <Link to="/player-portal-competitions" className="arena-back-link">
                  <svg viewBox="0 0 1024 1024" className="arena-main-icon2">
                      <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
                  </svg>
              </Link>
            <div className="arena-team-links-container">
              <Link to="/arena-main" className="arena-main-link">
                ARENA
              </Link>
              <Link to="/arena-submissions" className="arena-team-link">
                Submissions
              </Link>
              <Link
                to="/arena-leaderboard"
                className="arena-team-link1 Anchor"
              >
                lEADERBOARD
              </Link>
              <Link
                to="/arena-team"
                className="arena-team-link2 Anchor"
              >
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-team-container1">
            <Link to="/arena-profile" className="arena-team-navlink">
              <svg viewBox="0 0 1024 1024" className="arena-team-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-team-mobile-menu">
            <div className="arena-team-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-team-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-team-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="arena-team-icon6">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-team-links-container1">
              <span className="arena-team-link3 Anchor">Resources</span>
              <span className="arena-team-link4 Anchor">Inspiration</span>
              <span className="arena-team-link5 Anchor">Process</span>
              <span className="arena-team-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="arena-team-section-separator"></div>
      <div className="arena-team-section-separator1"></div>
      <div className="arena-team-section-separator2"></div>
      <div className="arena-team-section-separator3"></div>

      <TeamManager
        TeamName="Team Name"
        TeamMember1="Team Member 1"
        TeamMember2="Team Member 2"
        TeamMember3="Team Member 3"
        TeamMember4="Team Member 4"
        location = "Gauteng"
        Ldisabled={disabled}
        LonClick={handleInputSubmit}
        DName="Delete this team"
        Ddisabled={disabled}
        DonClick={handleInputSubmit}
      />

    </div>

  )
}

export default ArenaTeam
