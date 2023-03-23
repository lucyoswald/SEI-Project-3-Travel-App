// import { config } from "dotenv";
import { useEffect, useState } from "react";
import { API_URL } from "../consts";
import jwt_decode from "jwt-decode";
import axios from "axios";

const MyItinerary = () => {
  const [activityName, setActivityName] = useState("");
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  let userId = decodedToken.id;
  // console.log(userId);

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
        console.log(foundUser.itinerary[0].name);
        setActivityName(foundUser.itinerary[0].name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>You've made it to the My Itinerary Page!!!</h2>
      <p>{activityName}</p>
    </div>
  );
};

export default MyItinerary;
