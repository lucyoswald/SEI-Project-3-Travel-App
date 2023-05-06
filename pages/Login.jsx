import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_background_image from "../assets/pexels-marlon-martinez-1494708.jpg";
import { API_URL } from "../consts.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    try {
      const { data } = await axios.post(`${API_URL}/login`, formData);
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("localStorageCountries", data.likedCountries);
      navigate("/");
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <div className="form_page">
      <img
        src={login_background_image}
        alt="Background image"
        className="form_background_image"
      />

      <form onSubmit={onSubmit} className="sl_form login_form">
        <h3 className="form_header login">Login</h3>

        <input
          className="input_text"
          type="email"
          value={formData.email}
          name="email"
          onChange={onChange}
          placeholder="Email"
        />
        <input
          className="input_text"
          type="password"
          value={formData.password}
          name="password"
          onChange={onChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate("/signup")}>Don't have an account? </p>
      </form>
      {showError && (
        <div classs="container p-5 serror">
          <div
            class="alert alert-danger alert-dismissible fade show signuperror"
            role="alert"
            style={{ position: "absolute", width: "200px" }}
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

export default Login;
