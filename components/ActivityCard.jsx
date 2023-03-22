import { Card, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../consts";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const ActivityCard = ({ activities }) => {
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
      if (activityId === activities._id) {
        setAddedToItinerary(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="individual_country__activity">
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
                          <Button
                            onClick={() => addToItinerary(activity._id)}
                            variant="primary"
                            className="cardbutton"
                            // disabled={addedToItinerary}
                          >
                            {addedToItinerary
                              ? "Added to Itinerary"
                              : "Add to Itinerary"}
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
    </div>
  );
};

export default ActivityCard;
