import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataGrid from "../components/datagridAdminCompetitions";
import "./admin-competitions.css";
import Button from "../components/button";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import { useState } from "react";
import InputBoxForInfo from "../components/input-box-for-info";
import { CommonlyUsedComponents as NewCalenderComp, handleChange } from "../components/NewCalenderComp.js"
import { PickerOverlay } from "filestack-react";
import "../components/modal.css";
import { TeamSizeSelector, min, max , maxTeams} from "../components/TeamSizeSelector.js";
import InputTextArea from "../components/input-textarea.js"

function getNumTestcases(testcases) {
  var numtestcases = 1;
  for (var i = 0; i < testcases.length; i++) {
    if (testcases[i] === ",") {
      numtestcases++;
    }
  }
  return numtestcases;
}

// Modal.setAppElement(el)
function PostCompDetails(
  compname,
  pic,
  CombinedCompStart,
  CombinedCompEnd,
  desc,
  pdf,
  testcaseNum,
  testcases,
  marker,
  CombinedRegStart,
  CombinedRegEnd,
  maxTeams,
  min,
  max
) {
  return axios.post("http://localhost:3002/api/post/Create_comp", {
    compname: compname,
    pic: pic,
    CombinedCompStart: CombinedCompStart,
    CombinedCompEnd: CombinedCompEnd,
    desc: desc,
    pdf: pdf,
    testcaseNum: testcaseNum,
    testcases: testcases,
    marker: marker,
    CombinedRegStart: CombinedRegStart,
    CombinedRegEnd: CombinedRegEnd,
    numTeams: maxTeams,
    min: min,
    max: max
  });
}





function GenGrid() {
  const [rows, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:3002/api/get/competitions").then((response) => {
      const data = response.data.map((data, index) => ({
        id: index + 1,
        competition_id: data.competition_id,
        competition_name: data.competition_name,
        competition_views: data.competition_views,
        registration_startdate: data.registration_startdate,
        registration_enddate: data.registration_enddate,
        competition_startdate: data.competition_startdate,
        competition_enddate: data.competition_enddate,
        competition_no_testcases: data.no_testcases,
      }));
      setData(data);
    });
  }, []);

  return (
    <DataGrid rows={rows} pageSize={25} autoHeight={true}/>
  );
}

const AdminCompetitions = (props) => {
  const [compname, setCompname] = useState("");
  const [testcases, setTestCases] = useState("");
  const [desc, setdesc] = useState("");
  const [pic, setpic] = useState("");
  const [pdf, setpdf] = useState("");
  const [marker, setmarker] = useState("");
  const [RegStart, setRegStart] = useState(null);
  const [RegEnd, setRegEnd] = useState(null);
  const [RegStartTime, setRegStartTime] = useState(null);
  const [RegEndTime, setRegEndTime] = useState(null);
  const [CompStart, setCompStart] = useState(null);
  const [CompEnd, setCompEnd] = useState(null);
  const [CompStartTime, setCompStartTime] = useState(null);
  const [CompEndTime, setCompEndTime] = useState(null);
  let CombinedRegStart = RegStart + " " + RegStartTime;
  let CombinedRegEnd = RegEnd + " " + RegEndTime;
  let CombinedCompStart = CompStart + " " + CompStartTime;
  let CombinedCompEnd = CompEnd + " " + CompEndTime;

  const [visible, setvisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const username = sessionStorage.getItem('username');
  
  // Get user details from database, to make displaying it easier
  const getUserDetails = () => {
    axios
      .get("http://localhost:3002/api/get/userDetails/" + username)
      .then(function (response) {
        sessionStorage.setItem('userID', (response.data)[0].user_id);
        sessionStorage.setItem('useremail', (response.data)[0].user_email);
        sessionStorage.setItem('userpassword',(response.data)[0].user_password);
      });
  }

  window.onload = getUserDetails();

  const handleUploadDone = (res) => {
    console.log(res.filesUploaded[0].url); // Print the URL of the uploaded file
  console.log(res.filesUploaded[0].mimetype); // Print the MIME type of the uploaded file

  if (res.filesUploaded[0].mimetype === "image/png" ||
    res.filesUploaded[0].mimetype === "image/jpeg" ||
    res.filesUploaded[0].mimetype === "image/jpg") {
    setpic(res.filesUploaded[0].url);
  }

  if (res.filesUploaded[0].mimetype === "application/pdf") {
    setpdf(res.filesUploaded[0].url);
  }

  if (res.filesUploaded[0].mimetype === "text/x-python") {
    setmarker(res.filesUploaded[0].url);
  }
  };

  const handleClosePicker = () => {
    setPickerVisible(false); // Hide the picker
  };

  return (
    <div className="admin-competitions-container" style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
      <Modal 
        isOpen={visible}
        style={{
          content: {
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "scroll",
            // maxHeight: "100vh"
          },
          overlay: { zIndex: 1000 },
        }}
      >
        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "#457B9D" }}>Create Competition</h1>
          <br/>

          <InputBoxForInfo
          buttonText="Competition Name"
          onChange={(e) => {
          setCompname(e.target.value);
          console.log("Compname value:", e.target.value);
          }}
          />

          <br/>

          <h3 style={{ color: "#457B9D" }}>Team Size</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TeamSizeSelector />
          </div>

          <h3 style={{ color: "#457B9D", textAlign: "center"  }}>Test Case Names</h3>

          <InputTextArea 
            label="testcase 1, testcase 2, etc..."
            onChange={(e) => setTestCases(e.target.value)}
          ></InputTextArea>

          <br/>

          <h3 style={{ color: "#457B9D" }}>Uploads</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Competition Picture"
              style={{ background: "#457B9D", color: "white" }}
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Competition PDF"
              style={{ background: "#457B9D", color: "white" }}
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Upload Marker Script"
              style={{ background: "#457B9D", color: "white" }}
              onClick={() => {
                setPickerVisible(true);
              }}
            />
          </div>
     
          {pickerVisible && (
            <div
              className="center"
              style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}
            >
              <PickerOverlay
                key="picker-overlay"
                apikey={process.env.REACT_APP_API_KEY_FILESTACK}
                onUploadDone={(res) => {
                  handleUploadDone(res);
                }}
                pickerOptions={{
                  onClose: () => {
                    handleClosePicker();
                  },
                }}
              />
            </div>
          )}
          <br/>
          <h3 style={{ color: "#457B9D" }}>Registration Period Details</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>  
            <NewCalenderComp
              date1_label="Registration Opening Date"
              date2_label="Registration Closing Date"
              time1_label="Registration Opening Time"
              time2_label="Registration Closing Time"
              onStartDateChange={(date) => {setRegStart(date)}}
              onEndDateChange={(date) => {setRegEnd(date)}}
              onStartTimeChange={(date) => {setRegStartTime(date)}}
              onEndTimeChange={(date) => {setRegEndTime(date)}}
            ></NewCalenderComp>
          </div>

          <br/>
          <h3 style={{ color: "#457B9D" }}>Competing Period Details</h3>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>  
            <NewCalenderComp
              date1_label="Competing Opening Date"
              date2_label="Competing Closing Date"
              time1_label="Competing Opening Time"
              time2_label="Competing Closing Time"
              onStartDateChange={(date) => {setCompStart(date)}}
              onEndDateChange={(date) => {setCompEnd(date)}}
              onStartTimeChange={(date) => {setCompStartTime(date)}}
              onEndTimeChange={(date) => {setCompEndTime(date)}}
            ></NewCalenderComp>
          </div>

          <br/>
          <h3 style={{ color: "#457B9D" }}>Competition Description</h3>

          <InputTextArea 
          label="Competition Description"
          onChange={(e) => {
          setdesc(e.target.value);
          }}
          ></InputTextArea>


          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Create"
              onClick={() => {
                setvisible(false);
                setPickerVisible(false);
                // console.log("Create button clicked");
                // console.log("Competition Name is:" + compname);
                // console.log("Number of teams is " + maxTeams);
                // console.log("Team min is:" + min);
                // console.log("Team max is:" + max);
                // console.log("Test cases are:" + testcases);
                // console.log("Num testcases is:" + getNumTestcases(testcases));
                // console.log("pic link is:" + pic);
                // console.log("pdf link is:" + pdf);
                // console.log("marker link is:" + marker);
                // console.log("regStartDate: " + CombinedRegStart);
                // console.log("regEndDate: " + CombinedRegEnd);
                // console.log("compStartDate: " + CombinedCompStart);
                // console.log("compEndDate: " + CombinedCompEnd);
                // console.log("Desc: " + desc);
                PostCompDetails(
                  compname,
                  pic,
                  CombinedCompStart,
                  CombinedCompEnd,
                  desc,
                  pdf,
                  getNumTestcases(testcases),
                  testcases,
                  marker,
                  CombinedRegStart,
                  CombinedRegEnd,
                  maxTeams,
                  min,
                  max
                );
                window.location.reload(false);
              }}
            />
          </div>

          <div style={{ marginLeft: 6, marginTop: 5 }}>
            <Button
              name="Close"
              onClick={() => {
                setvisible(false);
                setPickerVisible(false);
                // console.log("button clicked");
              }}
            />
          </div>
        </div>
      </Modal>
      <div data-role="Header" className="admin-competitions-navbar-container">
        <div className="admin-competitions-navbar">
          <div className="admin-competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="admin-competitions-image"
            />
            <div
              data-role="BurgerMenu"
              className="admin-competitions-burger-menu"
            >
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="admin-competitions-links-container">
              <Link
                to="/admin-competitions"
                className="admin-competitions-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/admin-teams"
                className="admin-competitions-link2 Anchor"
              >
                TEAMS
              </Link>
            </div>
          </div>
          <div className="admin-competitions-container1">
            <Link to="/admin-profile" className="admin-competitions-navlink">
              <svg viewBox="0 0 1024 1024" className="admin-competitions-icon2">
                <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
              </svg>
            </Link>
          </div>
          <div
            data-role="MobileMenu"
            className="admin-competitions-mobile-menu"
          >
            <div className="admin-competitions-container2">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="admin-competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="admin-competitions-close-menu"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  className="admin-competitions-icon4"
                >
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="admin-competitions-links-container1">
              <Link to="/admin-home" className="admin-competitions-link">
                HOME
              </Link>
              <Link
                to="/admin-competitions"
                className="admin-competitions-link1 Anchor"
              >
                COMPETITIONS
              </Link>
              <Link
                to="/admin-teams"
                className="admin-competitions-link2 Anchor"
              >
                TEAMS
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-container" style={{height: "800px"}}>
        <GenGrid />
      </div>

      <Button
        name="Create Competition"
        onClick={() => {
          setvisible(true);
          // console.log("button clicked");
        }}
        // rootClassName="button-root-class-name2"
      />
      <br/>
    </div>
  );
};
export default AdminCompetitions;
