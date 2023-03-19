import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import InputBoxForInfo from "../components/input-box-for-info";
import Button from "../components/button";
import "./login.css";

const Login = (props) => {
  return (
    <div className="login-container">
      <Helmet>
        <title>login - Project ARENA</title>
        <meta property="og:title" content="login - Project ARENA" />
      </Helmet>
      <div className="login-container1">
        <div className="login-container2">
          <Link to="/" className="login-navlink">
            <svg viewBox="0 0 877.7142857142857 1024" className="login-icon">
              <path d="M519.429 797.143l58.286-58.286c14.286-14.286 14.286-37.143 0-51.429l-175.429-175.429 175.429-175.429c14.286-14.286 14.286-37.143 0-51.429l-58.286-58.286c-14.286-14.286-37.143-14.286-51.429 0l-259.429 259.429c-14.286 14.286-14.286 37.143 0 51.429l259.429 259.429c14.286 14.286 37.143 14.286 51.429 0zM877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
            </svg>
          </Link>
        </div>
        <div className="login-container3">
          <span className="login-text">LOGIN</span>
          <br></br>
          <InputBoxForInfo buttonText="USERNAME"></InputBoxForInfo>
          <InputBoxForInfo buttonText="PASSWORD" isPassword></InputBoxForInfo>
          <br></br>
          <Button
            name="Login"
            onClick={() => {
              console.log("Login button clicked");
            }}
            rootClassName="button-root-class-name2"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
