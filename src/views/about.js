import React from "react";
import { Link } from "react-router-dom";

import "./about.css";

const About = (props) => {
  return (
    <div className="about-container">
      <div data-role="Header" className="about-navbar-container">
        <div className="about-navbar">
          <div className="about-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="about-image"
            />
            <div data-role="BurgerMenu" className="about-burger-menu">
              <svg viewBox="0 0 1024 1024" className="about-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="about-links-container">
              <Link to="/" className="about-link">
                HOME
              </Link>
              <Link to="/competitions" className="about-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="about-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="about-link3 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
          <div className="about-right-side">
            <Link to="/register" className="about-cta-btn button">
              PROJECT PORTAL
            </Link>
          </div>
          <div data-role="MobileMenu" className="about-mobile-menu">
            <div className="about-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="about-image1"
              />
              <div data-role="CloseMobileMenu" className="about-close-menu">
                <svg viewBox="0 0 1024 1024" className="about-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="about-links-container1">
              <span className="about-link4 Anchor">Resources</span>
              <span className="about-link5 Anchor">Inspiration</span>
              <span className="about-link6 Anchor">Process</span>
              <span className="about-link7 Anchor">Our story</span>
            </div>
          </div>
        </div>
      </div>
      <div className="about-section-separator"></div>
      <div className="about-section-separator1"></div>
      <div className="about-section-separator2"></div>
      <div className="about-section-separator3"></div>
    </div>
  );
};

export default About;
