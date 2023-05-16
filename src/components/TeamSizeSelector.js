import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

let min = 1;
let max = 10;
let maxTeams = 50;

function TeamSizeSelector() {
  const [minSize, setMinSize] = useState(1);
  const [maxSize, setMaxSize] = useState(10);
  const [numTeams, setNumTeams] = useState(50);
  const [teamMembers, setTeamMembers] = useState([]);

  function handleMinSizeChange(event) {
    min = parseInt(event.target.value);
    setMinSize(min);
    console.log(`Minimum team size changed to ${min}`);
  }

  function handleMaxSizeChange(event) {
    max = parseInt(event.target.value)
    setMaxSize(max);
    console.log(`Maximum team size changed to ${max}`);
  }

  function handleNumTeamsChange(event) {
    maxTeams = parseInt(event.target.value);
    setNumTeams(maxTeams);
    console.log(`Number of teams changed to ${event.target.value}`);
  }

  return (
    <Box
    sx={{
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    }}>
      <TextField
        label="Max number of teams"
        type="number"
        inputProps={{ min: 0 }}
        value={numTeams}
        onChange={handleNumTeamsChange}
        style={{ marginBottom: "10px"}}
      />

     <h3 style={{ color: "#457B9D", textAlign: "center",marginBottom: "10px"   }}>Team Members</h3>

      <TextField
        label="Minimum team size"
        type="number"
        inputProps={{ min: 0 }}
        value={minSize}
        onChange={handleMinSizeChange}
      />

      <TextField
        label="Maximum team size"
        type="number"
        inputProps={{ min: 0 }}
        value={maxSize}
        onChange={handleMaxSizeChange}
      />

      <br />

      {teamMembers.map((member, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          <span className={`team-manager-text${index + 2}`}>{member}</span>
        </div>
      ))}
    </Box>
  );
}

export { TeamSizeSelector, min, max, maxTeams };
