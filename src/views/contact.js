import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import "./contact.css";

const Contact = (props) => {
  return (
    <div className="contact-container">
      <Helmet>
        <title>Contact - Project ARENA</title>
        <meta property="og:title" content="Contact - Project ARENA" />
      </Helmet>
      <div data-role="Header" className="contact-navbar-container">
        <div className="contact-navbar">
          <div className="contact-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="contact-image"
            />
            <div data-role="BurgerMenu" className="contact-burger-menu">
              <svg viewBox="0 0 1024 1024" className="contact-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="contact-links-container">
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
          <div className="contact-right-side">
            <Link to="/register" className="contact-cta-btn button">
              PROJECT PORTAL
            </Link>
          </div>
          <div data-role="MobileMenu" className="contact-mobile-menu">
            <div className="contact-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="contact-image1"
              />
              <div data-role="CloseMobileMenu" className="contact-close-menu">
                <svg viewBox="0 0 1024 1024" className="contact-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="contact-links-container1">
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
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section-separator"></div>
      <div className="contact-section-separator1"></div>
      <div className="contact-section-separator2"></div>
      <div className="contact-section-separator3"></div>
    </div>
  );
};

export default Contact;
