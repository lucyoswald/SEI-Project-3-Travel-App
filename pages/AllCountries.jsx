import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts";
import { useEffect, useState } from "react";

const AllCountries = () => {
  const [countryCardData, setCountryCardData] = useState([]);
  const [cardsToDisplay, setCardsToDisplay] = useState([]);
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
            image: country.image,
            text: country.text,
            numbOfActivities: country.activities.length,
          };
        });
        setCountryCardData(updatedData);
        setCardsToDisplay(updatedData);
      } catch (err) {
        console.log("This didn't Worker.");
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const onSearch = (e) => {
    const filteredCards = countryCardData.filter((country) =>
      country.countryName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCardsToDisplay(filteredCards);
  };

  return (
    <div>
      <form className="p2_search search_form" onSubmit={onSearch}>
        <input
          className="p2_search_type"
          // value={search}
          type="text"
          placeholder="Search for a country..."
          onChange={onSearch}
          name="country"
        ></input>
      </form>
      {isLoading ? (
        <p>Content Loading...</p>
      ) : (
        <ul className="country-card-container">
          {cardsToDisplay.map((country) => {
            return (
              <li className="country-card" key={country.countryId}>
                <Card style={{ width: "20rem" }}>
                  <Card.Img variant="top" src={country.image} />
                  <Card.Body>
                    <Card.Title>{country.countryName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {country.numbOfActivities} travel activties
                    </Card.Subtitle>
                    <Card.Text>{country.text}</Card.Text>
                    <Button
                      className="activities-button"
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
