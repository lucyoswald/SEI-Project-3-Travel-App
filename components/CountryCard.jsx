import { Card, Button } from "react-bootstrap";
import Heart from "react-heart";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts.js";
const CountryCard = ({ country }) => {
  console.log(country.countryData);
  const [active, setActive] = useState(false);
  const [likes, setLikes] = useState(undefined);

  const likeButton = async () => {
    let newNumberOfLikes = country.countryData.numberOfLikes;

    //check if the liked country is in the user likes

    if (active) {
      setLikes(newNumberOfLikes + 1);
    } else if (!active) {
      setLikes(newNumberOfLikes - 1);
    }

    const id = country.countryData._id;
    console.log(id);

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${API_URL}/countries/${id}`,
        { numberOfLikes: active ? newNumberOfLikes - 1 : newNumberOfLikes + 1 },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(data);
      //append the country onto the likedCountries array

      console.log("Liked!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="individual_country">
      <div className="individual_country__card">
        <Card>
          <Card.Body>
            {country ? (
              <div className="country__info">
                <Card.Img
                  varient="top"
                  src={country.countryData.image}
                  alt="country_image"
                  className="country_background_image"
                />
                <Card.Title className="country_card_name">
                  {country.countryData.name}
                </Card.Title>
                <Card.Subtitle className="continent">
                  {country.countryData.continent}
                  <br />
                </Card.Subtitle>
                <Card.Text className="currency">
                  {/* Currency: {""} */}
                  {country.countryData.currencyName} <br />
                  <br />
                  {country.countryData.text}
                </Card.Text>
                <Button variant="primary" className="cardbutton">
                  Add your own activity
                </Button>{" "}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    right: "1rem",
                    marginRight: "0.8rem",
                  }}
                >
                  <div style={{ width: "2rem" }}>
                    <Heart
                      isActive={active}
                      onClick={() => {
                        console.log(active);
                        setActive(!active);
                        likeButton();
                      }}
                      animationTrigger="both"
                      inactiveColor="rgba(255,125,125,.75)"
                      activeColor="#FFB6C1"
                      animationDuration={0.1}
                      className="heart"
                    />
                  </div>
                </div>
                {/* <button onClick={() => likeButton()}>Like </button> */}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CountryCard;
