import { Card, Button } from "react-bootstrap";
import Heart from "react-heart";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts.js";
import { useParams } from "react-router-dom";
const CountryCard = ({ country }) => {
  // console.log(country.countryData);
  const [active, setActive] = useState(false);
  const [likes, setLikes] = useState(undefined);
  // const [heartResponse, setHeartResponse] = useState(null);
  // const userId = useParams();
  // console.log(userId);
  const likeButton = async () => {
    //get item from local storage and save

    const lsCountries = localStorage.getItem("localStorageCountries");
    console.log(lsCountries);

    let newNumberOfLikes = country.countryData.numberOfLikes;
    const id = country.countryData._id;

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      //user id in the route
      const res = await axios.patch(`${API_URL}/userlikes/${userId}`, {
        country: country.countryData.name,
      });
      console.log(res);

      const localStorageCountries = res.data.updatedLikes.likedCountries;

      localStorage.setItem("localStorageCountries", localStorageCountries);

      console.log(localStorageCountries);

      //country id in the route
      await axios.patch(
        `${API_URL}/countries/${id}/likes`,
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
                    <p>
                      {active
                        ? country.countryData.numberOfLikes + 1
                        : country.countryData.numberOfLikes}
                    </p>
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
