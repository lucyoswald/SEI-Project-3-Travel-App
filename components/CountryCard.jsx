import { Card, Button } from "react-bootstrap";
import Heart from "react-heart";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts";
import jwt_decode from "jwt-decode";

const CountryCard = ({ country }) => {
  const [active, setActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const initialFormData = {
    category: "",
    activityCountry: "",
    name: "",
    location: "",
    description: "",
    price: "",
    imageUrl: "",
    linkToWebsite: "",
    createdBy: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onClick = () => {
    setFormData(initialFormData);
    setShowForm(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.name || !formData.location) {
      setShowError(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      const userId = decodedToken.id;
      const activityLocation = country.countryData._id;
      console.log(activityLocation);
      const addedActivity = await axios.post(
        `${API_URL}/activities`,
        {
          ...formData,
          createdBy: userId,
          activityCountry: activityLocation,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(addedActivity);
    } catch (err) {
      console.log("not worked");
      console.log(err);
    }
  };

  return (
    <div className="individual_country">
      <div className="individual_country__card">
        <Card style={{ width: "30.1rem" }}>
          <Card.Body>
            {country ? (
              <div className="country__info">
                <Card.Img
                  style={{ width: "30rem" }}
                  varient="top"
                  src={country.countryData.image}
                  alt="country_image"
                  className="country_background_image"
                />
                <Card.Title className="country_card_name">
                  {country.countryData.name}
                </Card.Title>
                <Card.Subtitle className="continent">
                  {country.countryData.continent}
                  <br />
                </Card.Subtitle>
                <Card.Text className="currency">
                  {/* Currency: {""} */}
                  {country.countryData.currencyName} <br />
                  <br />
                  {country.countryData.text}
                </Card.Text>
                {showForm ? (
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
                      // onClick={() => showForm(false)}
                    >
                      {" "}
                      Add Activity
                    </Button>
                    {showError && (
                      <div class="container p-5 error countryerror">
                        <div
                          class="alert alert-danger alert-dismissible fade show errorbox countryerror"
                          role="alert"
                        >
                          <strong>Please fill in the relevant fields...</strong>
                          <button
                            type="button"
                            class="close closebutton countryclose "
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => setShowError(false)}
                          >
                            <span aria-hidden="True">&times;</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  <div>
                    <Button
                      onClick={onClick}
                      variant="primary"
                      className="cardbutton"
                    >
                      Add your own activity
                    </Button>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "1rem",
                        right: "1rem",
                        marginRight: "0.8rem",
                      }}
                    >
                      <div style={{ width: "2rem" }}>
                        <Heart
                          isActive={active}
                          onClick={() => setActive(!active)}
                          animationTrigger="both"
                          inactiveColor="rgba(255,125,125,.75)"
                          activeColor="#FFB6C1"
                          animationDuration={0.1}
                          className="heart"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* <button onClick={() => likeButton()}>Like </button> */}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CountryCard;
