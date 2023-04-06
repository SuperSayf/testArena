import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';

import Button from '../components/button'
import Phone from '../components/phone'
import Email1 from '../components/email1'
import InputBoxForInfo from "../components/input-box-for-info";
import InputTextArea from "../components/input-textarea";
import './contact.css'


//get input from contact page
const Contact = (props) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [emailError, setEmailError] = useState(null);
  
  // const handleChange = event => {
  //   setEmail(event.target.value);
  // };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // const checkIfBlank=()=>{
  //   //checking if inputs are blank
    
  //   if(name == "" || message =="" || subject == ""){
  //     alert("Please enter all details");
  //   }
  //   else{
  //     //checking if email is valid
  //     if (isValidEmail(email)) {
  //       console.log('The email is valid');
  //     } else {
  //       setEmailError('Email is invalid');
  //     }
  //   }
  // }

  //send email to admin of site
  const sendEmail = (event) => {
    setEmailError(null);
    if(name == "" || message =="" || subject == ""){
      alert("Please enter all details");
    }
    else{
      if (isValidEmail(email)) {
        console.log('The email is valid');
        axios.post("http://localhost:3002/api/send/email", { name: name, subject: subject, email: email, message: message })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      } else {
        setEmailError('Email is invalid');
      }
    }

      
  
  
    //alert("Submitted")
    // Reset the text fields
    setName("");
    console.log(name);
    setSubject("");
    console.log(subject);
    setEmail("");
    console.log(email);
    setMessage("");
    console.log(message);
    setSubmitCount(submitCount + 1);
    //console.log("Submitted");
  };

  return (
    <div className="contact-container">
      <div data-role="Header" className="contact-navbar-container">
        <div className="contact-navbar">
          <div className="contact-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="contact-image" />
            <div data-role="BurgerMenu" className="contact-burger-menu">
              <svg viewBox="0 0 1024 1024" className="contact-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="contact-links-container">
              <Link to="/home" className="contact-link">
                HOME
              </Link>
              <Link to="/competitions" className="contact-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="contact-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
          <div className="contact-right-side">
            <Link to="/login" className="contact-cta-btn button">
              PROJECT PORTAL
            </Link>
          </div>
          <div data-role="MobileMenu" className="contact-mobile-menu">
            <div className="contact-container01">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="contact-image1" />
              <div data-role="CloseMobileMenu" className="contact-close-menu">
                <svg viewBox="0 0 1024 1024" className="contact-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="contact-links-container1">
              <Link to="/" className="contact-link">
                HOME
              </Link>
              <Link to="/competitions" className="contact-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="contact-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section-separator"></div>
      <div className="contact-section-separator01"></div>
      <div className="contact-section-separator02"></div>
      <div className="contact-section-separator03"></div>
      <div className="contact-container02">
        <div className="contact-container03">

          <div className="contact-container04">
            <span className="contact-text">Send us a message </span>
          </div>
          <div className="contact-section-separator04"></div>
          <div className="contact-section-separator05"></div>
          <div className="contact-section-separator06"></div>
          <div className="contact-section-separator07"></div>
          <div className="contact-container05">
            <div key={submitCount} className="contact-container11">
              
              <InputBoxForInfo
                buttonText="Name"
                onChange={(e) => setName(e.target.value)}
              ></InputBoxForInfo>
              {/* {nameError && <div className="error">{nameError}</div>} */}

              <InputBoxForInfo
                buttonText="Subject"
                onChange={(e) => setSubject(e.target.value)}
              ></InputBoxForInfo>

              <InputBoxForInfo
                buttonText = "Email"
                //value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></InputBoxForInfo>
              {emailError && <div className="error">{emailError}</div>}

              <InputTextArea
                label="Type your message here..."
                onChange={(e) => setMessage(e.target.value)}
              ></InputTextArea>

            </div>
          </div>
          <Button
            name="Submit"
            type="submit"
            onClick={sendEmail}
            rootClassName="button-root-class-name2"
          >Send</Button>
        </div>
        <div className="contact-container-for-big-page">
          <div className="contact-container06">
            <span className="contact-text1">
              <span>Contact Details</span>
              <br></br>
            </span>
          </div>
          <div className="contact-section-separator08"></div>
          <div className="contact-section-separator09"></div>
          <div className="contact-section-separator10"></div>
          <div className="contact-container07">
            <div className="contact-container08">
              <Phone
                text="Enter Number here"
                rootClassName="phone-root-class-name"
              ></Phone>
            </div>
            <Email1
              text="Enter Email here"
              rootClassName="email1-root-class-name"
            ></Email1>
          </div>
        </div>
      </div>
      <div className="contact-container-for-small-pages">
        <div className="contact-container09">
          <span className="contact-text4">
            <span>Contact Details</span>
            <br></br>
          </span>
        </div>
        <div className="contact-section-separator11"></div>
        <div className="contact-section-separator12"></div>
        <div className="contact-section-separator13"></div>
        <div className="contact-container10">
          <div className="contact-container11">
            <Phone
              text="Enter Number here"
              rootClassName="phone-root-class-name1"
            ></Phone>
          </div>
          <Email1
            text="Enter Email here"
            rootClassName="email1-root-class-name1"
          ></Email1>
        </div>
      </div>
    </div>
  )
}

export default Contact
