import { Input } from "@mui/material";
import React, { useState } from "react";
import Button from '../components/button';
import InputBoxForInfo from "./input-box-for-info";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./team-manager.css";

export default function TeamManager(props) {
  const { rootClassName, TeamName,TeamMember1,TeamMember2,TeamMember3,TeamMember4, location, LonClick,Ldisabled, DName, DonClick,Ddisabled } = props;
  const [inputValue, setInputValue] = useState("");
  //const [location, setLocation] = useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="team-manager-container">
      <div className="team-manager-container1">
        <span className="team-manager-text">TeamManager</span>
      </div>
      <h1 className="team-manager-text1">{TeamName}</h1>
      <span className="team-manager-text2">{TeamMember1}</span>
      <span className="team-manager-text3">{TeamMember2}</span>
      <span className="team-manager-text4">{TeamMember3}</span>
      <span className="team-manager-text5">{TeamMember4}</span>
      <span className="team-manager-location">Location: {location}</span>
      {/* <span className="team-manager-location">Location:</span>

      

      <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Location</InputLabel>
        <Select
          data-testid="location-select"
          labelId="location-select"
          id="location-select"
          value={location}
          label="Location"
          onChange={handleChange}
          style={{display: "flex", justifyContent: "center" }}
        >
          <MenuItem value={"Gauteng"}>Gauteng</MenuItem>
          <MenuItem value={"KwaZulu-Natal"}>KwaZulu-Natal</MenuItem>
          <MenuItem value={"Western Cape"}>Western Cape</MenuItem>
          <MenuItem value={"Free State"}>Free State</MenuItem>
          <MenuItem value={"North West"}>North West</MenuItem>
          <MenuItem value={"Eastern Cape"}>Eastern Cape</MenuItem>
          <MenuItem value={"Limpopo"}>Limpopo</MenuItem>
          <MenuItem value={"Mpumalanga"}>Mpumalanga</MenuItem>
          <MenuItem value={"Northern Cape"}>Northern Cape</MenuItem>
        </Select>
      </FormControl>
      </Box> */}

      {/* Buttons*/}

      {/* <Button
            className="team-manager-location-button"
            name="Update Location"
            disabled = {Ldisabled}
            onClick={() => LonClick(inputValue)}
            style={{ marginTop: "25px" }}
        /> */}
      <Button
            className="team-manager-delete-button"
            name={DName}
            disabled = {Ddisabled}
            onClick={() => DonClick(inputValue)}
            style={{ marginTop: "25px" }}
        />
    </div>
  );
}
