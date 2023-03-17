import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signup_background_image from "../assets/Italian_mountains.jpg";

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
      await axios.post(`http://localhost:6000/countries`, formData);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setShowError(true);
      console.log(formData);
    }
  };

  return (
    <div className="sign_up_page">
      <img
        src={signup_background_image}
        alt="Background image"
        className="signup_background_image"
      />
      {showError && (
        <div className="error">
          <h4>Something went wrong</h4>
        </div>
      )}
      <form className="sign_up_form" onSubmit={onSubmit}>
        <h3 className="sign_up_header">Sign Up</h3>

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
    </div>
  );
};

export default Signup;
