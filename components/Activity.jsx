import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../consts";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

const ActivityCard = ({ activity }) => {
  const [addedToItinerary, setAddedToItinerary] = useState(false);

  const addToItinerary = async (activityId) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      const userId = decodedToken.id;

      const addedActivity = await axios.patch(
        `${API_URL}/user/${userId}`,
        { activityId },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(addedActivity);
      setAddedToItinerary(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        <Card.Title className="activity_name">{activity.name}</Card.Title>
        <Card.Text className="activity_text">
          <span>{activity.description}</span> <br />
          <span> {activity.location}</span>
          <br /> <span>Cost: £{activity.price}</span>
        </Card.Text>
        <Button
          onClick={() => addToItinerary(activity._id)}
          variant="primary"
          className="cardbutton"
          // disabled={addedToItinerary}
        >
          {addedToItinerary ? "Added to Itinerary" : "Add to Itinerary"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ActivityCard;
