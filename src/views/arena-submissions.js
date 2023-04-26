import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from 'react';
import './arena-submissions.css'
import DataGrid from "../components/dataGridSubmissions";

const competition_id = sessionStorage.getItem('CompID');
const user_id  = sessionStorage.getItem('userID');


const ArenaSubmissions = (props) => {
  const [numTests, setNumTests] = useState(0);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3002/api/get/numTests/${competition_id}`)
      .then(response => {
        setNumTests(response.data[0].no_testcases); 
        // console.log(response.data[0].no_testcases) 
      });
  
    axios.get(`http://localhost:3002/api/get/testcase_prev/${competition_id}/${user_id}`)
      .then(response => {
        const historyJSON = JSON.parse(response.data[0].testcase_prev);
        const newData = Object.values(historyJSON).map(testcaseObj => {
          const testcaseData = [];
          for (let i = 1; i <= numTests; i++) {
            testcaseData.push(testcaseObj[`testcase_${i}`]);
          }
          return testcaseData;
        });
        setData(newData);
        // console.log(newData);
      });
  }, [competition_id, user_id, numTests]);

  return (
    <div className="arena-submissions-container">
      <div data-role="Header" className="arena-submissions-navbar-container">
        <div className="arena-submissions-navbar">
          <div className="arena-submissions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="arena-submissions-image"
            />
            <div
              data-role="BurgerMenu"
              className="arena-submissions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="arena-submissions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <svg viewBox="0 0 1024 1024" className="arena-submissions-icon2">
              <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
            </svg>
            <div className="arena-submissions-links-container">
              <Link to="/arena-main" className="arena-main-link">
                ARENA
              </Link>
              <Link to="/arena-submissions" className="arena-submissions-link">
                Submissions
              </Link>
              <Link
                to="/arena-leaderboard"
                className="arena-submissions-link1 Anchor"
              >
                lEADERBOARD
              </Link>
              <Link
                to="/arena-team"
                className="arena-submissions-link2 Anchor"
              >
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-submissions-container1">
            <Link
              to="/arena-profile"
              className="arena-submissions-navlink"
            >
              <svg viewBox="0 0 1024 1024" className="arena-submissions-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-submissions-mobile-menu">
            <div className="arena-submissions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-submissions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-submissions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="arena-submissions-icon6"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-submissions-links-container1">
              <span className="arena-submissions-link3 Anchor">Resources</span>
              <span className="arena-submissions-link4 Anchor">
                Inspiration
              </span>
              <span className="arena-submissions-link5 Anchor">Process</span>
              <span className="arena-submissions-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="arena-submissions-section-separator"></div>
      <div className="arena-submissions-section-separator1"></div>
      <div className="arena-submissions-section-separator2"></div>
      <div className="arena-submissions-section-separator3"></div>
      <br/>
      <h1>Submission History</h1>
      <br/>
      <div>
      <DataGrid numColumns={numTests} data={data} />
    </div>
    </div >
    
  )
}

export default ArenaSubmissions