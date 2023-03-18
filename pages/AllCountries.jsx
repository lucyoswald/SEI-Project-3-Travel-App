import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts";
import { useEffect, useState } from "react";

const AllCountries = () => {
  const [countryCardData, setCountryCardData] = useState([]);
  const [isLoading, setIsLoading] = useState("true");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbResponse = await axios.get(`${API_URL}/countries`);

        const countryData = dbResponse.data.data;
        const updatedData = countryData.map((country) => {
          return {
            countryName: country.name,
            continent: country.continent,
            countryId: country._id,
            // countryImage: countryData.,
            // text: countryData.,
            numbOfActivities: country.activities.length,
          };
        });
        setCountryCardData(updatedData);
      } catch (err) {
        console.log("This didn't Worker.");
      }
    };
    fetchData();
    setIsLoading(false);
    console.log(countryCardData);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Content Loading...</p>
      ) : (
        <ul className="country-card-container">
          {countryCardData.map((country) => {
            return (
              <li className="country-card" key={country._id}>
                <Card style={{ width: "20rem" }}>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src="https://www.travelandleisure.com/thmb/n149x4IEv7uTFUHqaE2tQT8PInQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/header-positano-AMALFI0622-39a49349a2c145e6b3df85f884cf3217.jpg"
                    />
                    <Card.Title>{country.countryName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {country.numbOfActivities} travel activties
                    </Card.Subtitle>
                    <Card.Text>Text to be added</Card.Text>
                    <Button
                      as={Link}
                      to={`/countries/${country.countryId}`}
                      variant="primary"
                    >
                      {" "}
                      See all activities
                    </Button>
                  </Card.Body>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AllCountries;
