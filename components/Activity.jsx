import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../consts";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

const ActivityCard = ({ activity }) => {
  const [addedToItinerary, setAddedToItinerary] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const initialFormData = {
    category: activity.category,
    name: activity.name,
    location: activity.location,
    description: activity.description,
    price: activity.price,
    imageUrl: activity.imageUrl,
    linkToWebsite: activity.linkToWebsite,
    activityId: activity._id,
  };
  const [formData, setFormData] = useState(initialFormData);
  console.log(initialFormData);

  const onClick = () => {
    setFormData(initialFormData);
    setShowEditForm(true);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log("update button clicked");
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedActivity = await axios.patch(
        `${API_URL}/activities/${activity._id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(updatedActivity);
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

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
          <Button
            onClick={() => addToItinerary(activity._id)}
            variant="primary"
            className="cardbutton"
          >
            {addedToItinerary ? "Added to Itinerary" : "Add to Itinerary"}
          </Button>
          {showEditForm ? (
            <form className="activity-form" onSubmit={onSubmit}>
              <select
                name="category"
                value={formData.category}
                onChange={onChange}
              >
                <option value="">Select a category*</option>
                <option value="Things to do">Things to do</option>
                <option value="Things to see">Things to see</option>
                <option value="Places to eat">Places to eat</option>
              </select>
              <input
                placeholder="Activity Name*"
                name="name"
                value={formData.name}
                onChange={onChange}
              />{" "}
              <input
                placeholder="Location*"
                name="location"
                value={formData.location}
                onChange={onChange}
              />{" "}
              <input
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={onChange}
              />{" "}
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={onChange}
              />{" "}
              <input
                placeholder="Image"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={onChange}
              />{" "}
              <input
                placeholder="Link to site"
                name="linkToWebsite"
                value={formData.linkToWebsite}
                onChange={onChange}
              />
              <Button type="submit" className="form-button">
                {" "}
                Update
              </Button>{" "}
            </form>
          ) : (
            <Button className="cardbutton updateButton" onClick={onClick}>
              Update
            </Button>
          )}
        </Card.Text>
        {/* <Button
          onClick={() => addToItinerary(activity._id)}
          variant="primary"
          className="cardbutton"
        >
          {addedToItinerary ? "Added to Itinerary" : "Add to Itinerary"}
        </Button> */}
      </Card.Body>
    </Card>
  );
};

export default ActivityCard;
