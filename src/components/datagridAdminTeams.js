import * as React from "react";
import Box from "@mui/material/Box";
import InputBoxForInfo from "../components/input-box-for-info";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "react-modal";
import Button from "../components/button";
import DynamicSelect from "../components/DynamicSelect";
import axios from "axios";
import Swal from "sweetalert2";
import { set } from "date-fns";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function CustomDataGrid({ rows }) {
  const [clickedRowDelete, setClickedRowDelete] = React.useState();
  const [clickedRowEdit, setClickedRowEdit] = React.useState();
  const [visible, setvisible] = React.useState(false);
  const [membersVisible, setMembersVisible] = React.useState(false);
  const [buttonsEnabled, setButtonsDisabled] = React.useState(true);

  const [rowID, setRowID] = React.useState(null);
  const [teamCode, setTeamCode] = React.useState("");
  const [userID, setUserID] = React.useState("");
  const [teamName, setTeamName] = React.useState("");
  const [teamScore, setTeamScore] = React.useState("");
  const [competitionName, setCompetitionName] = React.useState("");

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const onButtonEdit = (e, row) => {
    e.stopPropagation();
    setClickedRowEdit(row);

    setRowID(row.id);
    setTeamCode(row.team_code);
    setUserID(row.user_id);
    setTeamName(row.team_name);
    setTeamScore(row.team_score);
    setCompetitionName(row.competition_name);

    setvisible(true);
  };

  const onButtonEditSubmit = async (e) => {
    console.log(rowID);
    console.log(teamCode);
    console.log(userID);
    console.log(teamName);
    console.log(teamScore);
    console.log(competitionName);

    try {
      const response = await axios.post(
        "http://localhost:3002/api/post/update/team",
        {
          team_code: teamCode,
          user_id: userID,
          team_name: teamName,
          team_score: teamScore,
        }
      );
      console.log(response.data);

      window.location.reload(false);

      setvisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    setButtonsDisabled(false);
    console.log(selectedValue);
  };

  const onButtonEditMembers = (e, row) => {
    e.stopPropagation();
    setClickedRowEdit(row);

    setRowID(row.id);
    setTeamCode(row.team_code);
    setUserID(row.user_id);
    setTeamName(row.team_name);
    setTeamScore(row.team_score);
    setCompetitionName(row.competition_name);

    getTeamMembers(e, row);

    setMembersVisible(true);
  };

  const onButtonDelete = async (e, row) => {
    e.stopPropagation();
    setClickedRowDelete(row);

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
        axios.post("http://localhost:3002/api/post/remove/team", {
          user_id: row.user_id,
          team_code: row.team_code,
        });

        Swal.fire("Deleted!", "Row has been deleted.", "success").then(() => {
          window.location.reload(false);
        });
      }
    });
  };

  const columns = [
    { field: "team_code", headerName: "Team Code", width: 250 },
    { field: "user_id", headerName: "User ID", width: 100 },
    { field: "team_name", headerName: "Team Name", width: 130 },
    { field: "team_score", headerName: "Team Score", width: 130 },
    { field: "competition_name", headerName: "Competition Name", width: 200 },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 530,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              name="Edit Details"
              onClick={(e) => onButtonEdit(e, params.row)}
            >
              Edit Details
            </Button>

            <Button
              name="Edit Members"
              onClick={(e) => onButtonEditMembers(e, params.row)}
            >
              Edit Members
            </Button>

            <Button
              name="Delete Team"
              onClick={(e) => onButtonDelete(e, params.row)}
            >
              Delete Team
            </Button>
          </Box>
        );
      },
    },
  ];

  //Global variable to store team members
  const [teamMemberList, setTeamMemberList] = React.useState([]);

  // Function to get list of team members
  const getTeamMembers = async (e, row) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/get/admin/teamMembers",
        {
          team_code: row.team_code,
          user_id: row.user_id,
        }
      );
      console.log(response.data);

      // Add team members to list
      const newTeamMemberList = [];
      for (let i = 0; i < response.data.length; i++) {
        const teamMember = response.data[i];
        newTeamMemberList.push({
          key: `member-${i + 1}`,
          label: `${teamMember.user_firstname} ${teamMember.user_surname}`,
          value: i + 1,
          user_id: teamMember.user_id // include user_id as a property of the team member object
        });
      }
      setTeamMemberList(newTeamMemberList); // Update the state with new list
    } catch (error) {
      console.error(error);
    }
  };

  const onButtonRemove = async (e) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this user from the team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {

        // Get the user_id of the user that is selected in the drop down menu
        const index = teamMemberList.findIndex((item) => item.value === value);
        const sel_userID = teamMemberList[index].user_id;

        const response = await axios.post(
          "http://localhost:3002/api/get/admin/teamMembers",
          {
            team_code: teamCode,
            user_id: sel_userID,
          }
        );
        console.log(response.data);

        // Find where the row in the data where the user_id is the same as the user_id of the response
        const indexSel = response.data.findIndex(
          (item) => item.user_id === sel_userID
        );

        // Check if the user is a team captain, true or false in response.data[index].team_captain
        if (response.data[indexSel].is_captain === true) {
          Swal.fire("Error!", "Cannot remove captain", "error").then(() => {
            // window.location.reload(false);
          });
        }
        // If user is not a team captain, remove the user from the team
        else {
          const response = axios.post(
            "http://localhost:3002/api/post/remove/teamMember",
            {
              team_code: teamCode,
              user_id: sel_userID,
            }
          );
          console.log(response.data);

          Swal.fire("Removed!", "User has been removed", "success").then(() => {
            window.location.reload(false);
          });
        }
      }
    });
  };

  const onButtonPromote = async (e) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to promote this user to team captain!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Promote",
    }).then((result) => {
      if (result.isConfirmed) {

        // Get the user_id of the user that is selected in the drop down menu
        const index = teamMemberList.findIndex((item) => item.value === value);
        const sel_userID = teamMemberList[index].user_id;

        axios.post(
          "http://localhost:3002/api/post/change/teamCaptain",
          {
            team_code: teamCode,
            user_id: sel_userID,
          }
        );

        Swal.fire("Promoted!", "User has been promoted", "success").then(() => {
          window.location.reload(false);
        });
      }
    });
  };

  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <Modal
        isOpen={visible}
        style={{
          content: {
            width: "70%",
            height: "70%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
            height: "100%",
          }}
        >
          <h1>Row selected for edit:</h1>

          <InputBoxForInfo
            buttonText="Team Code"
            initialValue={clickedRowEdit ? `${clickedRowEdit.team_code}` : null}
            onChange={(e) => setTeamCode(e.target.value)}
          />

          <InputBoxForInfo
            buttonText="User ID"
            initialValue={clickedRowEdit ? `${clickedRowEdit.user_id}` : null}
            onChange={(e) => setUserID(e.target.value)}
          />

          <InputBoxForInfo
            buttonText="Team Name"
            initialValue={clickedRowEdit ? `${clickedRowEdit.team_name}` : null}
            onChange={(e) => setTeamName(e.target.value)}
          />

          <InputBoxForInfo
            buttonText="Team Score"
            initialValue={
              clickedRowEdit ? `${clickedRowEdit.team_score}` : null
            }
            onChange={(e) => setTeamScore(e.target.value)}
          />

          <InputBoxForInfo
            buttonText="Competition Name"
            initialValue={
              clickedRowEdit ? `${clickedRowEdit.competition_name}` : null
            }
            onChange={(e) => setCompetitionName(e.target.value)}
          />

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Edit"
              onClick={(e) => {
                onButtonEditSubmit(e.target.value);
                console.log("Edit button clicked");
              }}
            />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10 }}>
            <Button
              name="Close"
              onClick={() => {
                setvisible(false);
                console.log("Close button clicked");
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={membersVisible}
        style={{
          content: {
            width: "70%",
            height: "70%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
            height: "100%",
          }}
        >
          <h1>Members:</h1>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <AvatarGroup max={5}>
              {teamMemberList.map((member) => (
                <Avatar key={member.key} {...stringAvatar(member.label)} />
              ))}
            </AvatarGroup>
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="dynamic-select-label">Select</InputLabel>
                <Select
                  labelId="dynamic-select-label"
                  id="dynamic-select"
                  value={value}
                  label="Select"
                  onChange={handleChange}
                >
                  {teamMemberList.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <Button
              name="Remove"
              onClick={(e) => {
                console.log("Remove button clicked");
                onButtonRemove(e.target.value);
              }}
              disabled={buttonsEnabled}
            />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 15, marginTop: 5 }}>
            <Button
              name="Promote"
              onClick={(e) => {
                console.log("Promote button clicked");
                onButtonPromote(e.target.value);
              }}
              disabled={buttonsEnabled}
            />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10 }}>
            <Button
              name="Close"
              onClick={() => {
                setMembersVisible(false);
                setButtonsDisabled(true);
                setValue("");
                console.log("Close button clicked");
              }}
            />
          </div>
        </div>
      </Modal>

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
  );
}
