import { Input } from "@mui/material";
import React, { useState } from "react";
import Button from '../components/button';
import InputBoxForInfo from "./input-box-for-info";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./TeamInputBox.css";

var location = "";

function TeamInputBox(props) {
  const { rootClassName, title, label, buttonText, name, onClick, code, disabled} = props;
  const [inputValue, setInputValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLocationChange = (event) => {
    console.log("handleLocationChange called"); // <-- add this line
    setLocationValue(event.target.value);
    location = event.target.value;
  };

  return (
    <div className={`team-input-box ${rootClassName}`}>
      <div className="team-input-box-container" data-testid="team-input">
        <div className="team-input-box-container1">
          <span className="team-input-box-text">{title}</span>
        </div>
        <h1 className="team-input-box-text1">{label}</h1>
        <div className="Sayf">
          <InputBoxForInfo
            buttonText={buttonText}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your input"
            data-testid="team-input"
          />

<span className="team-manager-location">Location:</span>

{/* Drop down menu */}

<Box sx={{ minWidth: 200 }}>
<FormControl fullWidth>
  <InputLabel id="simple-select-label">Location</InputLabel>
  <Select
    data-testid="location-select"
    labelId="location-select"
    id="location-select"
    value={locationValue}
    onChange={handleLocationChange}
    label="Location"
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
</Box>

          <Button
            data-testid="team-input-box-button"
            className="team-input-box-button"
            name={name}
            disabled = {disabled}
            onClick={() => onClick(inputValue,location)}
            style={{ marginTop: "25px" }}
          />
        </div>
        <br />
        <span className="team-input-box-text">{code}</span>
      </div>
    </div>
  );
}
export {TeamInputBox, location};
