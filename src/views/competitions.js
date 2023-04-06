import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import OverflowCard from "../components/OverflowCard";
import "./competitions.css";

function GenCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [isFlipped, setIsFlipped] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        const data = response.data.map((data) => ({
          title: data.competition_name,
          views: data.competition_views,
          image: data.competition_image,
          description: data.competition_info,
          endDate: data.competition_enddate,
        }));
        setCardsData(data);
      });
  }, []);

  const handleCardClick = (index) => {
    setIsFlipped(true);

    if (isFlipped) {
      axios
        .post("http://localhost:3002/api/post/competition/incViews", {
          competition_id: index + 1,
        })
        .then((response) => {
          console.log(response);
        });

      const newCardsData = [...cardsData];
      newCardsData[index].views += 1;
      setCardsData(newCardsData);

      setIsFlipped(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        maxWidth: "1024px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      {cardsData.map((cardData, index) => (
        <OverflowCard
          key={index}
          onClick={() => {
            handleCardClick(index);
          }}
          {...cardData}
        />
      ))}
    </div>
  );
}

const Competitions = (props) => {
  return (
    <div className="competitions-container">
      <Helmet>
        <title>Competitions - Project ARENA</title>
        <meta property="og:title" content="Competitions - Project ARENA" />
      </Helmet>
      <div data-role="Header" className="competitions-navbar-container">
        <div className="competitions-navbar">
          <div className="competitions-left-side">
            <img
              alt="image"
              src="https://play.teleporthq.io/static/svg/default-img.svg"
              className="competitions-image"
            />
            <div data-role="BurgerMenu" className="competitions-burger-menu">
              <svg viewBox="0 0 1024 1024" className="competitions-icon">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="competitions-links-container">
              <Link to="/" className="competitions-link">
                HOME
              </Link>
              <Link to="/competitions" className="competitions-link1 Anchor">
                COMPETITIONS
              </Link>
              <Link to="/contact" className="competitions-link2 Anchor">
                CONTACT
              </Link>
              <Link to="/about" className="contact-link3 Anchor">
                ABOUT
              </Link>
            </div>
          </div>
          <div className="competitions-right-side">
            <Link to="/login" className="competitions-cta-btn button">
              PROJECT PORTAL
            </Link>
          </div>
          <div data-role="MobileMenu" className="competitions-mobile-menu">
            <div className="competitions-container1">
              <img
                alt="image"
                src="https://play.teleporthq.io/static/svg/default-img.svg"
                className="competitions-image1"
              />
              <div
                data-role="CloseMobileMenu"
                className="competitions-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="competitions-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="competitions-links-container1">
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
      <div className="competitions-section-separator"></div>
      <div className="competitions-section-separator1"></div>
      <div className="competitions-section-separator2"></div>
      <div className="competitions-section-separator3"></div>

      {/* The OverFlow cards, leave some space */}
      <br />
      <GenCards />
      <br />
    </div>
  );
};

export default Competitions;
