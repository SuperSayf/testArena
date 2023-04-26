import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./arena-main.css";
//import tabs from "../components/tabs"
import BasicTabs from "../components/tabs";
import { PickerOverlay } from "filestack-react";
import { sub } from "date-fns";
import { ConstructionOutlined, ControlPointSharp } from "@mui/icons-material";
import { Tab } from "@mui/material";
import { da, hi } from "date-fns/locale";

const competition_id = sessionStorage.getItem("CompID");
const user_id = sessionStorage.getItem("userID");
let tabIndex = -1;
let latestSubmissionScores = [0];
let newHighestSub = "";
let numTests = 0;

//Function to set the latest scores
function getLatestScores() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:3002/api/get/testcase_latest/" +
          competition_id +
          "/" +
          user_id
      )
      .then(function (response) {
        const latestString = response.data[0].testcase_latest;
        console.log(response.data[0].testcase_latest);
        const jsonArray = JSON.parse(latestString);

        let count = 0;
        for (let key in jsonArray) {
          latestSubmissionScores[count] = jsonArray[key];
          count++;
        }
        console.log(latestSubmissionScores);
      });
    resolve(latestSubmissionScores);
  });
}

function getNumTestCases() {
  axios
    .get("http://localhost:3002/api/get/numTests/" + competition_id)
    .then(function (response) {
      numTests = response.data[0].no_testcases;
      console.log("Number of testcase" + numTests);
    });
}

//! Generates a random score when the user submits
function generateRandomNumber() {
  const number = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
  return number;
}

//!Gets the teamID
function getTeamID() {
  axios
    .get(
      "http://localhost:3002/api/get/team_name/" +
        competition_id +
        "/" +
        user_id
    )
    .then(function (response) {
      sessionStorage.setItem("teamName", response.data[0].team_name);
    });
}

//! Gets the testCases for the competition
function getCompTestCases(linkForPDF) {
  axios
    .get("http://localhost:3002/api/get/compTestCases/" + competition_id)
    .then(function (response) {
      linkForPDF = response.data[0].competition_testcases;
      // console.log(linkForPDF);
    });
}

function getLinkForPDF() {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3002/api/get/compTestCases/" + competition_id)
      .then(function (response) {
        const linkForPDF = response.data[0].competition_testcases;
        // console.log(linkForPDF);
        resolve(linkForPDF);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
}

function ScoredHigher() {
  let isHigher = false;
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://localhost:3002/api/get/testcase_highest/" +
          competition_id +
          "/" +
          user_id
      )
      .then(function (response) {
        // console.log("they have submitted before");
        const latestString = response.data[0].testcase_highest;
        const jsonArray = JSON.parse(latestString);
        let highestSub = [];
        let count = 0;
        for (let key in jsonArray) {
          highestSub[count] = jsonArray[key];
          count++;
        }
        for (let i = 0; i < latestSubmissionScores.length; i++) {
            // console.log(latestSubmissionScores[i] + " " + highestSub[i])
          if (latestSubmissionScores[i] > highestSub[i]) {
            //Change only the one that is higher
            highestSub[i] = latestSubmissionScores[i];
            isHigher = true;
          }
        }
        const obj = {};
        highestSub.map((value, index) => {
          obj[`testcase_${index + 1}`] = value;
        });
        const newHighestSub = JSON.stringify(obj);
        // console.log(newHighestSub);
        resolve([isHigher, newHighestSub]); // Resolve the promise with both values
      })
      .catch(reject);
  });
}

async function postHighestScore() {
  try {
    const [isHigher, newHighestSub] = await ScoredHigher();
      // console.log(newHighestSub);

    if (isHigher) {
      const response = await axios.post(
        "http://localhost:3002/api/post/highestScore/team",
        {
          team_name: sessionStorage.getItem("teamName"),
          testcase_highest: newHighestSub,
        }
      );
      return response;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

async function uploadSubmissions() {
  //Make the JSON String thing
  // console.log(latestSubmissionScores);
  const obj = {};

  latestSubmissionScores.map((value, index) => {
    obj[`testcase_${index + 1}`] = value;
  });

  const newSub = JSON.stringify(obj);
  // console.log("hello?");
  //Upload to submission history:
  axios
    .get(
      "http://localhost:3002/api/get/testcase_prev/" +
        competition_id +
        "/" +
        user_id
    )
    .then(function (response) {
      if (response.data[0].testcase_prev == null) {
        const originalObject = JSON.parse(newSub);
        const newObject = { 0: originalObject };
        const newString = JSON.stringify(newObject);
        axios.post("http://localhost:3002/api/post/testcasePrev/team", {
          team_name: sessionStorage.getItem("teamName"),
          testcase_prev: newString,
        });
      } else {
        // console.log(response.data[0].testcase_prev);
        const data = JSON.parse(response.data[0].testcase_prev);
        const nextKey = Object.keys(data).length.toString();
        const updatedData = { ...data, [nextKey]: obj };
        const updatedDataString = JSON.stringify(updatedData);
        // console.log(updatedDataString);
        axios.post("http://localhost:3002/api/post/testcasePrev/team", {
          team_name: sessionStorage.getItem("teamName"),
          testcase_prev: updatedDataString,
        });
      }
    });

  //Upload to latest
  axios.post("http://localhost:3002/api/post/latestScore/team", {
    team_name: sessionStorage.getItem("teamName"),
    testcase_latest: newSub,
  });

  await postHighestScore();
  
}

const ArenaMain = (props) => {
  
  const [pickerVisible, setPickerVisible] = useState(false);

  //This stores contents of tab, tab number and index in the array are related
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");

  let linkForPDF = "";

  //Executes when the page is loaded
  React.useEffect(() => {
    const fetchData = async () => {
      await getLatestScores();
      setIsLoaded(true);
    };
    fetchData();
    getNumTestCases(numTests);
    axios
      .get("http://localhost:3002/api/get/compDetails/" + competition_id)
      .then(function (response) {
        setTitle(response.data[0].competition_name);
        setParagraph(response.data[0].competition_info);
      });
    //Sets the link for the competition testcases
    getCompTestCases(linkForPDF);
    getTeamID();
  }, []);

  const [isLoaded, setIsLoaded] = React.useState(false);
  //Sets the pickerVisible to false, so you can actually click it again
  const handleClosePicker = () => {
    setPickerVisible(false);
  };
  //Returns the url for the file uploaded
  const handleUploadDone = (res) => {
    
  };
  return (
    <div className="arena-main-container">
      <div data-role="Header" className="arena-main-navbar-container">
        <div className="arena-main-navbar">
          <div className="arena-main-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="arena-main-image"
            />
            <div data-role="BurgerMenu" className="arena-main-burger-menu">
              <svg viewBox="0 0 1024 1024" className="arena-main-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <Link to="/player-portal-competitions" className="arena-back-link">
              <svg viewBox="0 0 1024 1024" className="arena-main-icon2">
                <path d="M896 470v84h-604l152 154-60 60-256-256 256-256 60 60-152 154h604z"></path>
              </svg>
            </Link>
            <div className="arena-main-links-container">
              <Link to="/arena-main" className="arena-main-link">
                ARENA
              </Link>
              <Link to="/arena-submissions" className="arena-submissions-link">
                SUBMISSIONS
              </Link>
              <Link to="/arena-leaderboard" className="arena-main-link1 Anchor">
                lEADERBOARD
              </Link>
              <Link to="/arena-team" className="arena-main-link2 Anchor">
                TEAM
              </Link>
            </div>
          </div>
          <div className="arena-main-container1">
            <Link to="/arena-profile" className="arena-main-navlink">
              <svg viewBox="0 0 1024 1024" className="arena-main-icon4">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div data-role="MobileMenu" className="arena-main-mobile-menu">
            <div className="arena-main-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="arena-main-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="arena-main-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="arena-main-icon6">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="arena-main-links-container1">
              <span className="arena-main-link3 Anchor">Resources</span>
              <span className="arena-main-link4 Anchor">Inspiration</span>
              <span className="arena-main-link5 Anchor">Process</span>
              <span className="arena-main-link6 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="arena-main-section-separator"></div>
      <div className="arena-main-section-separator1"></div>
      <div className="arena-main-section-separator2"></div>
      <div className="arena-main-section-separator3"></div>
      <br />
      <h1>{title}</h1>
      <p>{paragraph}</p>
      <br />
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault(); // This prevents the default behavior of the link
          const link = event.currentTarget;
          if (link) {
            link.style.cursor = "wait"; // Set the cursor to 'wait'
            const pdfLink = await getLinkForPDF();
            window.open(pdfLink);
            setTimeout(() => {
              link.style.cursor = "default"; // Set the cursor back to default after a delay
            }, 1000); // Change the delay time as needed
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>Download PDF</u>
      </a>

      <br />
      <br />
      <h1>Submit your code here:</h1>
      <div className="arena-main-tabs">
      <div>
      {isLoaded && (
        <BasicTabs
          tabContent={latestSubmissionScores}
          tabCount={numTests}
          onSubmit={(index) => {
            setPickerVisible(true);
            tabIndex = index + 1;
            console.log(tabIndex);
          }}
        />
      )}
    </div>
        {pickerVisible && (
          <PickerOverlay
            key="picker-overlay"
            apikey={process.env.REACT_APP_API_KEY_FILESTACK}
            onUploadDone={(res) => {
              handleUploadDone(res);

              //This sets the new score
              latestSubmissionScores[tabIndex - 1] = generateRandomNumber();
              // console.log(latestSubmissionScores);
              uploadSubmissions();
              setTimeout(function () {
                window.location.reload(false);
              }, 550);
              
            }}
            pickerOptions={{
              onClose: () => {
                handleClosePicker();
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ArenaMain;
