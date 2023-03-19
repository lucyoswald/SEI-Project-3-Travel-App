import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../consts.js";
import country_temp_image from "../assets/Cinque_Terra_night.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Carousel } from "react-bootstrap";
import Heart from "react-heart";

const CountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState();
  const [activities, setActivities] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${API_URL}/countries/${id}`);
      console.log(data);
      const { activities } = data.countryData;
      console.log(activities);
      setCountry(data);
      setActivities(activities);
      // console.log(data.activities);
    };
    fetchData();
  }, []);

  const likeButton = async () => {
    //you want to post to the backend and update the country
    //schema number ofLikes
    //then you want to update the inner text to say 1like or 2 so on + maybe have the button change to 'remove like"
    try {
      await axios.post(`${API_URL}/countries/${id}`, { numberOflikes: 1 });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="individual_country">
      <div className="individual_country__card">
        <Card>
          <Card.Img
            varient="top"
            //   {country.countryData.image} - so weird i added this in and it works
            //but then if you refresh the picture goes!
            src={country_temp_image}
            alt="country_image"
            className="country_background_image"
          />
          <Card.Body>
            {country ? (
              <div className="country__info">
                <Card.Title className="country_card_name">
                  {country.countryData.name}
                </Card.Title>
                <Card.Subtitle className="continent">
                  {country.countryData.continent}
                  <br />
                </Card.Subtitle>
                <Card.Text className="currency">
                  Currency: {""}
                  {country.countryData.currencyName}
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
                      onClick={() => setActive(!active)}
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
      <div className="individual_country__activity">
        {activities ? (
          <div>
            {/* <h2 className="activities_header">Activities</h2> */}
            <div className="categories-container">
              {Array.from(
                new Set(activities.map((activity) => activity.category))
              ).map((category) => (
                <div key={category} className="category_box">
                  <h3 className="category_header">{category}</h3>
                  <Carousel style={{ marginTop: "30px" }}>
                    {activities
                      .filter((activity) => activity.category === category)
                      .map((activity) => (
                        <Carousel.Item key={activity._id}>
                          <Card
                            // style={{ maxWidth: "450px" }}
                            className="activity_card"
                          >
                            <Card.Img
                              variant="top"
                              src={activity.imageUrl}
                              className="card-img-top"
                            />
                            <Card.Body>
                              <Card.Title className="activity_name">
                                {activity.name}
                              </Card.Title>
                              <Card.Text className="activity_text">
                                <span>{activity.description}</span> <br />
                                <span> {activity.location}</span>
                                <br /> <span>Cost: £{activity.price}</span>
                              </Card.Text>
                              <Button variant="primary" className="cardbutton">
                                Add to Itinerary
                              </Button>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      ))}
                  </Carousel>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading activities...</p>
        )}
      </div>
    </div>
  );
};

export default CountryPage;
