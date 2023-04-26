import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import OverflowCard from "../components/OverflowCard";
import "./competitions.css";
import AccordionContent from "../components/collapse";

const GetDate = () => {
  return new Date();
  //console.log(CurrentTime);
};

//Differentiate between 2 dates
const GetDateDifference = (date1, date2) => {
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if (Difference_In_Days > 0) {
    return true; // competition is active
  } else {
    return false; // competition is not active
  }
};

//DISPLAY ACTIVE CARDS
function GenCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [activeData, setActiveData] = React.useState([]);
  const [inactiveData, setInactiveData] = React.useState([]);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const fetchCardData = () => {
    return axios
      .get("http://localhost:3002/api/get/competitions")
      .then((response) => {
        //console.log(response.data);
        const data = response.data.map((data) => ({
          competition_id: data.competition_id,
          title: data.competition_name,
          views: data.competition_views,
          image: data.competition_image,
          description: data.competition_info,
          endDate: data.competition_enddate,
        }));
        return data;
      });
  };

  // const fetchActiveData = (cardsData) => {
  //   const CompsendDates = cardsData.map((data) => data.endDate);
  //   const newCardsData = [...cardsData];
  //   for (let i = 0; i < newCardsData.length; i++) {
  //     const sdate = GetDateDifference(new Date(CompsendDates[i]), GetDate());
  //     console.log(sdate);
  //     if (GetDateDifference(new Date(CompsendDates[i]), GetDate())) {
  //       newCardsData[i].isendDate = true;
  //     } else {
  //       newCardsData[i].isendDate = false;
  //     }
  //   }

  //   console.log(CompsendDates);
  //   console.log(newCardsData);
  //   return newCardsData;
  // };

  const fetchActiveData = (cardsData) => {
    const newCardsData = [...cardsData];
    const now = GetDate();

    const activeCards = newCardsData.filter((card) => {
      const endDate = new Date(card.endDate);
      return endDate > now;
    });

    return activeCards;
  };

  const fetchInactiveData = (cardsData) => {
    const newCardsData = [...cardsData];
    const now = GetDate();

    const InactiveCards = newCardsData.filter((card) => {
      const endDate = new Date(card.endDate);
      return endDate <= now;
    });

    return InactiveCards;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCardData();
        const activeData = fetchActiveData(data);
        const inactiveData = fetchInactiveData(data);
        setCardsData(data);
        setActiveData(activeData);
        setInactiveData(inactiveData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // React.useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/api/get/competitions")
  //     .then((response) => {
  //       const data = response.data.map((data) => ({
  //         title: data.competition_name,
  //         views: data.competition_views,
  //         image: data.competition_image,
  //         description: data.competition_info,
  //         endDate: data.competition_enddate,
  //       }));
  //       setCardsData(data);
  //     });
  // }, []);

  const handleCardClick = async (competition_id) => {
    setIsFlipped(true);

    if (isFlipped) {
      try {
        const response = axios.post(
          "http://localhost:3002/api/post/competition/incViews",
          { competition_id: competition_id }
        );

        const newCardsData = [...cardsData];
        newCardsData[competition_id - 1].views += 1;
        setCardsData(newCardsData);
        // console.log(response);
        setIsFlipped(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  function getActiveCards() {
    return (
      <div
        data-testid="card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxWidth: "1024px",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {activeData.map((activeData, index) => (
          <OverflowCard
            key={index}
            onClick={() => {
              handleCardClick(activeData.competition_id);
            }}
            {...activeData}
          />
        ))}
      </div>
    );
  }

  function getInactiveCards() {
    return (
      <div
        data-testid="card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxWidth: "1024px",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        {inactiveData.map((inactiveData, index) => (
          <OverflowCard
            key={index}
            onClick={() => {
              handleCardClick(inactiveData.competition_id);
            }}
            {...inactiveData}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      data-testid="card"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        maxWidth: "1024px",
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <AccordionContent
        title="Active Competitions"
        content={getActiveCards()}
      />

      <AccordionContent
        title="Inactive Competitions"
        content={getInactiveCards()}
      />
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

      <GenCards />

      <br />
    </div>
  );
};

export default Competitions;
