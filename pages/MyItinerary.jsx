// import { config } from "dotenv";
import { useEffect, useState } from "react";
import { API_URL } from "../consts";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import ItineraryCard from "../components/ItineraryCard";

const MyItinerary = () => {
  const [activityDetails, setActivityDetails] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  let userId = decodedToken.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbResponse = await axios.get(`${API_URL}/user/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        // console.log(dbResponse);
        const { foundUser } = dbResponse.data;
        console.log(foundUser);
        const itineraryArray = foundUser.itinerary;
        let updatedItineraryArray = itineraryArray.map((activity) => {
          return {
            activityCountry: activity.activityCountry,
            description: activity.description,
            link: activity.link,
            activityName: activity.name,
            price: activity.price,
            activityId: activity._id,
          };
        });
        console.log(updatedItineraryArray);
        setActivityDetails(updatedItineraryArray);
      } catch (err) {
        next(err);
      }
    };
    fetchData();
  }, []);

  const deleteActivity = async (e) => {
    try {
      const removedActivity = await axios.delete(`${API_URL}/user/${userId}`, {
        params: {
          activityId: e.target.value,
        },
      });
      setActivityDetails(
        activityDetails.filter(
          (activity) => activity.activityId !== e.target.value
        )
      );
    } catch (err) {
      next(err);
    }
  };

  return (
    <div className="itinerary-card-container screen">
      <h2 className="itinerary-heading">Personal Itinerary</h2>
      <ul className="itinerary-card">
        {activityDetails.map(
          ({
            // activityCountry,
            description,
            link,
            activityName,
            price,
            activityId,
          }) => {
            return (
              <ItineraryCard
                deleteActivity={deleteActivity}
                // activityCountry={activityCountry}
                activity={activityName}
                description={description}
                link={link}
                price={price}
                activityId={activityId}
                key={activityId}
              />
            );
          }
        )}
      </ul>
    </div>
  );
};

export default MyItinerary;
