import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_background_image from "../assets/pexels-ben-mack-5326926.jpg";

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
      const { data } = await axios.post(
        `http://localhost:8000/countries/login`,
        formData
      );
      localStorage.setItem("token", data.token);
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
        <div classs="container p-5 lerror">
          <div
            class="alert alert-danger alert-dismissible fade show loginerror"
            role="alert"
          >
            <strong>Something went wrong...</strong>
            <button
              type="button"
              class="close lclosebutton"
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