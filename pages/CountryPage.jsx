import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../consts.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Carousel } from "react-bootstrap";
import CountryCard from "../components/CountryCard.jsx";
import LoadingVisual from "../components/LoadingVisual";
import ActivityCard from "../components/ActivityCard.jsx";

const CountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading("true");
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/countries/${id}`);
        console.log(data);
        const { activities } = data.countryData;
        console.log(activities);
        setIsLoading(false);
        setCountry(data);
        setActivities(activities);
        // console.log(data.activities);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const likeButton = async () => {
    //you want to post to the backend and update the country
    //schema number ofLikes
    //then you want to update the inner text to say 1like or 2 so on + maybe have the button change to 'remove like"
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/countries/${id}`,
        { numberOflikes: 1 },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingVisual />
      ) : (
        <div>
          <CountryCard country={country} />
          <ActivityCard activities={activities} />
        </div>
      )}
    </div>
  );
};

export default CountryPage;
