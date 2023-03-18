import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../consts.js";
import country_temp_image from "../assets/Cinque_Terra_night.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Carousel } from "react-bootstrap";

const CountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState();
  const [activities, setActivities] = useState([]);

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

  return (
    <div className="individual_country">
      <div className="individual_country__card">
        <Card>
          <Card.Img
            varient="top"
            src={country_temp_image}
            alt="country_image"
            className="country_background_image"
          />
          <Card.Body>
            {country ? (
              <div className="country__info">
                <Card.Title>{country.countryData.name}</Card.Title>
                <Card.Subtitle>{country.countryData.continent}</Card.Subtitle>
                <Card.Text>
                  Currency: <br />
                  {country.countryData.currencyName}
                </Card.Text>
                <Button variant="primary">Add your own activity</Button>{" "}
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
            <h2>Activities</h2>
            {Array.from(
              new Set(activities.map((activity) => activity.category))
            ).map((category) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {activities
                    .filter((activity) => activity.category === category)
                    .map((activity) => (
                      <li key={activity._id}>
                        <Card style={{ width: "18rem" }}>
                          <Card.Img variant="top" src={activity.imageUrl} />
                          <Card.Body>
                            <Card.Title>{activity.name}</Card.Title>
                            <Card.Text>
                              {activity.location}
                              {activity.description} £{activity.price}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                          </Card.Body>
                        </Card>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading activities...</p>
        )}
      </div>
    </div>
  );
};

export default CountryPage;
