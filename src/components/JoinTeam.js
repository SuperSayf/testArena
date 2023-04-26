import { Input } from "@mui/material";
import React, { useState } from "react";
import Button from "../components/button";
import InputBoxForInfo from "./input-box-for-info";
import "./TeamInputBox.css";

export default function JoinTeam(props) {
  const {
    rootClassName,
    title,
    label,
    buttonText,
    name,
    onClick,
    code,
    disabled,
  } = props;
  const [inputValue, setInputValue] = useState("");


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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
            data-testid="input"
          />
          <Button
            data-testid="team-input-box-button"
            className="team-input-box-button"
            name={name}
            disabled={disabled}
            onClick={() => onClick(inputValue, location)}
            style={{ marginTop: "25px" }}
          />
        </div>
        <br />
        <span className="team-input-box-text">{code}</span>
      </div>
    </div>
  );
}
