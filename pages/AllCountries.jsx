import axios from "axios";
import { API_URL } from "../consts";
import { useEffect, useState } from "react";
import AllCountryCard from "../components/AllCountryCard";
import LoadingVisual from "../components/LoadingVisual";
import SearchOnPage from "../components/SearchOnPage";

function AllCountries() {
  const [countryCardData, setCountryCardData] = useState([]);
  const [cardsToDisplay, setCardsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading("true");
    const fetchData = async () => {
      try {
        const dbResponse = await axios.get(`${API_URL}/countries`);
        const countryData = dbResponse.data.data;
        const updatedData = countryData
          .map((country) => {
            return {
              countryName: country.name,
              continent: country.continent,
              countryId: country._id,
              image: country.image,
              text: country.text,
              numbOfActivities: country.activities.length,
            };
          })
          .sort((a, b) => a.countryName.localeCompare(b.countryName));
        setIsLoading(false);
        setCountryCardData(updatedData);
        setCardsToDisplay(updatedData);
      } catch (err) {
        setIsLoading(false);
        setShowError(true);
        setErrorMessage("Something went wrong, please try again later.");
      }
    };
    fetchData();
  }, []);

  const onSearch = (e) => {
    const filteredCards = countryCardData.filter((country) =>
      country.countryName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (filteredCards.length === 0) {
      setShowError(true);
      setErrorMessage("Country not found.");
    } else {
      setShowError(false);
    }
    setCardsToDisplay(filteredCards);
  };

  return (
    <div>
      <SearchOnPage onSearch={onSearch} />
      {showError ? <p className="error-message">{errorMessage}</p> : null}
      {isLoading ? (
        <LoadingVisual />
      ) : (
        <ul className="country-card-container">
          {cardsToDisplay.map(
            ({ countryName, countryId, image, text, numbOfActivities }) => {
              return (
                <AllCountryCard
                  countryName={countryName}
                  countryId={countryId}
                  image={image}
                  text={text}
                  numbOfActivities={numbOfActivities}
                  key={countryId}
                />
              );
            }
          )}
        </ul>
      )}
    </div>
  );
}

export default AllCountries;
