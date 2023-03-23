import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../consts.js";
import CountryCard from "../components/CountryCard.jsx";
import LoadingVisual from "../components/LoadingVisual";
import ActivityCarousel from "../components/ActivityCarousel.jsx";

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

  return (
    <div>
      {isLoading ? (
        <LoadingVisual />
      ) : (
        <div>
          <CountryCard country={country} />
          <ActivityCarousel activities={activities} />
        </div>
      )}
    </div>
  );
};

export default CountryPage;
