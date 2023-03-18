import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signup_background_image from "../assets/Italian_mountains.jpg";
import { API_URL } from "../consts.js";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    try {
      await axios.post(`${API_URL}/signup`, formData);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setShowError(true);
      console.log(formData);
    }
  };

  return (
    <div className="form_page">
      <img
        src={signup_background_image}
        alt="Background image"
        className="form_background_image"
      />
      <form className="sl_form" onSubmit={onSubmit}>
        <h3 className="form_header">Sign Up</h3>

        {/* input for USERNAME here */}
        <input
          className="input_text first_input"
          type="text"
          value={formData.username}
          placeholder="Username"
          name="username"
          onChange={onChange}
        ></input>
        {/* input for EMAIL here */}
        <input
          className="input_text"
          type="email"
          value={formData.email}
          placeholder="Email"
          name="email"
          onChange={onChange}
        ></input>
        {/* input for PASSWORD here */}
        <input
          className="input_text"
          type="password"
          value={formData.password}
          placeholder="Password"
          name="password"
          onChange={onChange}
        ></input>
        {/* input for PASSWORD CONFIRMATION here */}
        <input
          className="input_text"
          type="password"
          value={formData.passwordConfirmation}
          placeholder="Confirm Password"
          name="passwordConfirmation"
          onChange={onChange}
        ></input>
        <button type="submit">Sign up</button>
        <p onClick={() => navigate("/login")}>Already have an account? </p>
      </form>
      {showError && (
        <div classs="container p-5 serror">
          <div
            class="alert alert-danger alert-dismissible fade show signuperror"
            role="alert"
          >
            <strong>Something went wrong...</strong>
            <button
              type="button"
              class="close sclosebutton"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowError(false)}
            >
              <span aria-hidden="True">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
