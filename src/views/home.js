import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Helmet } from "react-helmet";

import "./home.css";

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Project ARENA</title>
        <meta property="og:title" content="Project ARENA" />
      </Helmet>
      <div data-role="Header" className="home-navbar-container">
        <div className="home-navbar">
          <div className="home-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="home-image"
            />
            <div data-role="BurgerMenu" className="home-burger-menu">
              <svg viewBox="0 0 1024 1024" className="home-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="home-links-container">
              <Link to="/" className="home-link">
                HOME
              </Link>
              <Link to="/competitions" className="home-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="home-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
              {/* <Link to="/admin-home" className="contact-link3 Anchor">
                ADMIN
              </Link> */}
            </div>
          </div>
          <div className="home-right-side">
            <Link to="/login" className="home-cta-btn button">
              <span>
                <span className="home-text1">PROJECT PORTAL</span>
                <br></br>
              </span>
            </Link>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="home-image1"
              />
              <div data-role="CloseMobileMenu" className="home-close-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="home-links-container1">
              <Link to="/" className="home-link">
                HOME
              </Link>
              <Link to="/competitions" className="home-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="home-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
              <Link to="/admin-home" className="contact-link4 Anchor">
                ADMIN
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <Typewriter
        autoStart={true}
        loop={false}
        onInit={(typewriter) => {
          typewriter
            .changeDelay(100)
            .typeString('Welcome fellow warrior!')
            .pauseFor(100)
            .deleteChars(15)
            .typeString('to the Arena!')
            .pauseFor(100)
            .deleteAll()
            .typeString('Project Arena')
            .start();
        }}
      />
    </div>
  );
};

export default Home;
