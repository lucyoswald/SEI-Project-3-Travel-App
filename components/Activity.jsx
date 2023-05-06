import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "../consts";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getLoggedInUser } from "./Auth.js";

const ActivityCard = ({ activity }) => {
  const [addedToItinerary, setAddedToItinerary] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [addedToI, setAddedToI] = useState(false);
  console.log(activity);
  const [viewUpdateForm, setViewUpdateForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [showError, setShowError] = useState(false);

  const role = localStorage.getItem("role");

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  });
  console.log(loggedInUser);
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const addedToIStyling = () => {
    setAddedToI(!addedToI);
  };

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
    if (
      loggedInUser &&
      (activity.createdBy === loggedInUser || role === "admin")
    ) {
      setFormData(initialFormData);
      setShowEditForm(true);
      setViewUpdateForm(true);
    } else if (loggedInUser && activity.createdBy !== loggedInUser) {
      setShowError("not created");
    } else {
      setShowError("not logged in");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setViewUpdateForm(true);
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
    <>
      <Card
        className={viewUpdateForm ? "activity_card_expanded" : "activity_card"}
      >
        <Card.Img
          variant="top"
          src={activity.imageUrl}
          className="card-img-top"
        />
        <Card.Body>
          <Card.Title className="activity_name">{activity.name}</Card.Title>
          <Card.Text className="activity_text">
            <p style={{ display: "inline-block" }}>
              {readMore
                ? activity.description
                : activity.description.slice(0, 200)}
              {activity.description.length > 200 && (
                <span className="read-more" onClick={toggleReadMore}>
                  {readMore ? " ...Read Less" : " ...Read More"}
                </span>
              )}
            </p>
            <br />
            <br />
            <span> {activity.location}</span>
            <br /> <span>Cost: £{activity.price}</span>
            <Button
              onClick={() => {
                addedToIStyling();
                addToItinerary(activity._id);
              }}
              variant="primary"
              className="cardbutton"
              style={{
                position: "absolute",
                bottom: "10px",
              }}
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
                <Button
                  type="submit"
                  className="form-button"
                  // onClick={() => setShowForm(false)}
                >
                  {" "}
                  Update
                </Button>{" "}
              </form>
            ) : (
              <Button
                className="cardbutton updateButton"
                style={{
                  position: "absolute",
                  left: "135px",
                  marginLeft: addedToI && "20px",
                  bottom: "10px",
                }}
                onClick={onClick}
              >
                Update
              </Button>
            )}
          </Card.Text>
        </Card.Body>
        {showError && (
          <div
            className="container p-5 error"
            style={{ position: "absolute", marginTop: "300px", width: "300px" }}
          >
            <div
              className="alert alert-danger alert-dismissible fade show errorbox"
              role="alert"
            >
              <strong>
                {" "}
                {showError === "not created"
                  ? "You are not the creator of this activity!"
                  : showError === "not logged in"
                  ? "Sorry, you need to login before you can update an activity."
                  : null}
              </strong>
              <button
                type="button"
                className="close closebutton"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowError(false)}
              >
                <span aria-hidden="True">&times;</span>
              </button>
            </div>
          </div>
        )}
      </Card>
      <></>
    </>
  );
};

export default ActivityCard;
