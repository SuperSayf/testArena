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
  const { rootClassName, TeamName, teamMembers, location, LonClick,Ldisabled, DName, DonClick,Ddisabled, onCopyClick } = props;
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setLocation(event.target.value);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="team-manager-container">
      <div className="team-manager-container1">
        <span className="team-manager-text"></span>
        
      </div>
      <h1 className="team-manager-text1">{TeamName}</h1>
      <br/>
      <h2>Team Members</h2>
      <br/>
      {teamMembers.map((member, index) => (
        <div key={index} style={{marginBottom: "5px"}}>
          <span className={`team-manager-text${index+2}`}>{member}</span>
        </div>
      ))}
      <br/>
      <span className="team-manager-location">Location: {location}</span>

      {/* Buttons*/}
      <Button
        className="team-manager-delete-button"
        name={DName}
        disabled={Ddisabled}
        onClick={() => DonClick(inputValue)}
        style={{ marginTop: "25px" }}
      />
      <br/>
      <Button
          className="team-manager-copy-button"
          name="Copy Team Code"
          onClick={onCopyClick}
        />
    </div>
  );
}
