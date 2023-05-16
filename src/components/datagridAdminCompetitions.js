import { useState } from "react";
import Box from "@mui/material/Box";
import InputBoxForInfo from "../components/input-box-for-info";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "react-modal";
import Button from "../components/button";
import axios from "axios";
import Swal from "sweetalert2";
import { TeamSizeSelector, min, max , maxTeams} from "../components/TeamSizeSelector.js";
import { CommonlyUsedComponents as NewCalenderComp, handleChange } from "../components/NewCalenderComp.js"
import InputTextArea from "../components/input-textarea.js";

export default function CustomDataGrid({ rows }) {
  const [clickedRowDelete, setClickedRowDelete] = useState();
  const [clickedRowEdit, setClickedRowEdit] = useState();
  const [visible, setvisible] = useState(false);

  const [rowID, setRowID] = useState(null);
  const [compID, setcompID] = useState("");
  const [compname, setCompname] = useState("");
  const [RegStart, setRegStart] = useState("");
  const [RegEnd, setRegEnd] = useState("");
  const [CompStart, setCompStart] = useState("");
  const [CompEnd, setCompEnd] = useState("");
  const [testcases, setTestCases] = useState("");
  const [noTestcases, setNoTestCases] = useState("");
  const [maxTeams, setmaxTeams] = useState("");
  const [teamMin, setTeamMin] = useState("");
  const [teamMax, setTeamMax] = useState("");
  const [desc, setdesc] = useState("");
  const [pic, setpic] = useState("");
  const [pdf, setpdf] = useState("");
  const [marker, setmarker] = useState("");

  const [pickerVisible, setPickerVisible] = useState(false);

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

  const onButtonEdit = (e, row) => {
    e.stopPropagation();
    setClickedRowEdit(row);

    setRowID(row.id);
    setcompID(row.competition_id)
    setCompname(row.competition_name);
    setRegStart(row.registration_startdate);
    setRegEnd(row.registration_enddate);
    setCompStart(row.competition_startdate);
    setCompEnd(row.competition_enddate);
    setNoTestCases(row.competition_no_testcases);
    setmaxTeams(row.competition_max_teams);
    setTeamMax(row.competition_team_max);
    setTeamMin(row.competition_team_min);
    
    setvisible(true);
  };

  //TODO: Change to update competition details
  const onButtonEditSubmit = async (e) => {

    try {
    //   const response = await axios.post(
    //     "http://localhost:3002/api/post/update/team",
    //     {
    //       team_code: teamCode,
    //       user_id: userID,
    //       team_name: teamName,
    //       team_score: teamScore,
    //     }
    //   );
    //   console.log(response.data);

      window.location.reload(false);

      setvisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onButtonDelete = async (e, row) => {
    e.stopPropagation();
    setClickedRowDelete(row);
    console.log(row.competition_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(row.competition_id);
        axios.post("http://localhost:3002/api/post/remove/competition", {
          comp_id: row.competition_id,
        });

        Swal.fire("Deleted!", "Row has been deleted.", "success").then(() => {
          window.location.reload(false);
        });
      }
    });
  };

  const columns = [
    { field: "competition_id", headerName: "ID", width: 50 },
    { field: "competition_name", headerName: "Title", width: 120 },
    { field: "competition_views", headerName: "Views", width: 80 },
    { field: "registration_startdate", headerName: "Registration Starts", width: 160 },
    { field: "registration_enddate", headerName: "Registration Ends", width: 160 },
    { field: "competition_startdate", headerName: "Competition Starts", width: 160 },
    { field: "competition_enddate", headerName: "Competition Ends", width: 160 },
    { field: "competition_no_testcases", headerName: "No. Tests", width: 100 },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 340,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              name="Delete Team"
              onClick={(e) => onButtonDelete(e, params.row)}
            >
              Delete Team
            </Button>

            <Button
              name="Edit Details"
              onClick={(e) => onButtonEdit(e, params.row)}
            >
              Edit Details
            </Button>

          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 700, width: "100%" }}>
    <Modal 
        isOpen={visible}
        style={{
          content: {
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "scroll"
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
          initialValue={compname}
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

          <br/>

          <h3 style={{ color: "#457B9D" }}>Test Case Names</h3>

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
            //   onStartDateChange={(date) => {setRegStart(date)}}
            //   onEndDateChange={(date) => {setRegEnd(date)}}
            //   onStartTimeChange={(date) => {setRegStartTime(date)}}
            //   onEndTimeChange={(date) => {setRegEndTime(date)}}
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
            //   onStartDateChange={(date) => {setCompStart(date)}}
            //   onEndDateChange={(date) => {setCompEnd(date)}}
            //   onStartTimeChange={(date) => {setCompStartTime(date)}}
            //   onEndTimeChange={(date) => {setCompEndTime(date)}}
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
                console.log("Create button clicked");
                console.log("Competition Name is:" + compname);
                console.log("Number of teams is " + maxTeams);
                console.log("Team min is:" + min);
                console.log("Team max is:" + max);
                console.log("Test cases are:" + testcases);
                console.log("Num testcases is:" + getNumTestcases(testcases));
                console.log("pic link is:" + pic);
                console.log("pdf link is:" + pdf);
                console.log("marker link is:" + marker);
                console.log("regStartDate: " + CombinedRegStart);
                console.log("regEndDate: " + CombinedRegEnd);
                console.log("compStartDate: " + CombinedCompStart);
                console.log("compEndDate: " + CombinedCompEnd);
                console.log("Desc: " + desc);
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
      <Box sx={{ height: "100%", width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          pageSizeOptions={[50]}
        />
      </Box>
    </Box>
  );
}
