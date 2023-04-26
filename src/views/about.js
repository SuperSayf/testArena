import React from "react";
import { Link } from "react-router-dom";
import AccordionContent from "../components/collapse";


import "./about.css";

const About = (props) => {
  return (
    <div className="about-container">
      <div data-role="Header" className="about-navbar-container" data-testid="Header-container">
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
              <Link to="/" className="about-link" data-text="HOME">
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
              {/* <Link to="/player-portal-home" className="contact-link4 Anchor">
                PLAYER PORTAL
              </Link> */}
            </div>
          </div>
          <div className="about-right-side">
            <Link to="/login" className="about-cta-btn button">
              PROJECT PORTAL
            </Link>
          </div>
          <div data-role="MobileMenu" className="about-mobile-menu" data-testid="MobileMenu-container">
            <div className="about-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="about-image1"
              />
              <div data-role="CloseMobileMenu" className="about-close-menu" data-testid="CloseMobileMenu-container">
                <svg viewBox="0 0 1024 1024" className="about-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="about-links-container1">
              <Link to="/" className="contact-link" data-testid = "home">
                HOME
              </Link>
              <Link to="/competitions" className="contact-link1 Anchor" data-testid = "competitions">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="contact-link2 Anchor" data-testid = "contact">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor" data-testid = "about">
                ABOUT
              </Link>
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
