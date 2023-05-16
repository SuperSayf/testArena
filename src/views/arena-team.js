import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import TeamManager from '../components/team-manager'
import axios from "axios";
import './arena-team.css'
import Swal from 'sweetalert2'

const competition_id = sessionStorage.getItem('CompID');
const user_id = sessionStorage.getItem('userID');
let teamIds = [];
let teamLocation = ""

// Function to copy a value to clipboard
const copyToClipboard = (value) => {
  const textarea = document.createElement('textarea'); // Create a textarea element
  textarea.value = value; // Set the value to the textarea
  document.body.appendChild(textarea); // Append the textarea to the body
  textarea.select(); // Select the textarea
  document.execCommand('copy'); // Copy the selected text to clipboard
  document.body.removeChild(textarea); // Remove the textarea from the body
};

function handleInputSubmit(){
  
}

const ArenaTeam = (props) => {


  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [userNicknames, setUserNicknames] = useState([]);
  const [teamCode, setTeamCode] = useState("");
  //const [teamLocation, setTeamLocation] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the team name
        const teamNameResponse = await axios.get(`http://localhost:3002/api/get/teamName/${user_id}/${competition_id}`);
        const teamName = teamNameResponse.data[0].team_name;
  
        // Get the team location
        const teamLocationResponse = await axios.get(`http://localhost:3002/api/get/teamLocation/${teamName}/${competition_id}`);
         teamLocation = teamLocationResponse.data[0].team_location;
  
        // Get the team code
        const teamCodeResponse = await axios.get(`http://localhost:3002/api/get/teamCode/${teamName}/${competition_id}`);
        const teamCode = teamCodeResponse.data[0].team_code;
  
        // Get the competition details
        const compDetailsResponse = await axios.get(`http://localhost:3002/api/get/compDetails/${competition_id}`);
        const title = compDetailsResponse.data[0].competition_name;
  
        // Get the team members
        const teamMembersResponse = await axios.post(`http://localhost:3002/api/get/teamMembers`, null, {
          params: {
            user_id: user_id,
            competition_id: competition_id
          }
        });
        const teamMembers = teamMembersResponse.data;
  
        // Get the user nicknames
        const userIds = teamMembers.map(member => member.user_id);
        const userNicknameResponses = await Promise.all(userIds.map(userId => axios.get(`http://localhost:3002/api/get/userNickname/${userId}`)));
        const userNicknames = userNicknameResponses.map((response, index) => {
          const nickname = response.data[0].user_nickname;
          const isCaptain = teamMembers.find(member => member.user_id === userIds[index]).is_captain;
          return isCaptain ? `${nickname} (Captain)` : nickname;
        });
  
        // Update the state
        setTeamName(teamName);
        setTeamCode(teamCode);
        setTitle(title);
        setUserNicknames(userNicknames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  


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
      <br/>
      <h1>{title}</h1>
      <h2>Team Manager</h2>
      
      <TeamManager
        TeamName={teamName}
        teamMembers = {userNicknames}
        location = {teamLocation}
        Ldisabled={disabled}
        LonClick={handleInputSubmit}
        DName="Delete this team"
        Ddisabled={disabled}
        DonClick={handleInputSubmit}
        onCopyClick={() => {
          Swal.fire({
            title: 'Team created!',
            text: "Team Code: " + teamCode,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Copy'
            }).then((result) => {
            if (result.isConfirmed) {
              copyToClipboard(teamCode);
              
            }
          })
        }}
      />

    </div>

  )
}

export default ArenaTeam
