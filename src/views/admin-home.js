import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import './admin-home.css'

const AdminHome = (props) => {
  const username = sessionStorage.getItem('username');

  // Get user details from database, to make displaying it easier
  const getUserDetails = () => {
    axios
      .get("http://localhost:3002/api/get/userDetails/" + username)
      .then(function (response) {
        sessionStorage.setItem('userID', (response.data)[0].user_id);
        sessionStorage.setItem('useremail', (response.data)[0].user_email);
        sessionStorage.setItem('userpassword',(response.data)[0].user_password);
        setNewUsername(username);
        setNewEmail(email);
      });
  }

  window.onload = getUserDetails();

  return (
    <div className="admin-home-container">
      <div data-role="Header" className="admin-home-navbar-container">
        <div className="admin-home-navbar">
          <div className="admin-home-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-home-image"
            />
            <div data-role="BurgerMenu" className="admin-home-burger-menu">
              <svg viewBox="0 0 1024 1024" className="admin-home-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-home-links-container">
              <Link to="/admin-home" className="admin-home-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-home-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-home-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-home-container1">
            <Link to="/admin-profile" className="admin-home-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-home-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="admin-home-mobile-menu">
            <div className="admin-home-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-home-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-home-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="admin-home-icon4">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-home-links-container1">
            <Link to="/admin-home" className="admin-home-link">
                HOME
              </Link>
              <Link to="/admin-competitions" className="admin-home-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/admin-teams" className="admin-home-link2 Anchor">
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-home-section-separator"></div>
      <div className="admin-home-section-separator1"></div>
      <div className="admin-home-section-separator2"></div>
      <div className="admin-home-section-separator3"></div>
    </div>
  )
}

export default AdminHome
