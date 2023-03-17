import { useEffect, useState } from "react";
import axios from "axios";
import home_background_image from "../assets/Pretty archway.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    country: "",
  });
  const [countryInfo, setCountryInfo] = useState(undefined);

  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`http://localhost:6000/countries`, {
        params: formData,
      });
      console.log(data);
      const filteredData = data.filter();

      if (countryInfo.length === 0) setCountryInfo(data);
      localStorage.setItem("token", data.token);
    } catch (e) {
      setShowError(true);
    }
  };

  return (
    <div className="home">
      <img
        src={home_background_image}
        alt="Background image"
        className="home_background_image"
      />

      <h4 className="home_header">Where would you like to go?</h4>

      <section>
        <form className="input_form" onSubmit={onSubmit}>
          <input
            className="country_search"
            value={formData.country}
            type="text"
            placeholder="Type in your country..."
            onChange={onChange}
            name="country"
          ></input>

          <button type="button" className="submit_button">
            Submit
          </button>
        </form>
        <section className="signup_login_buttons">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="SignUp_button"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="LogIn_button"
          >
            Log In
          </button>
        </section>
      </section>
      {!countryInfo ? null : countryInfo.length === 0 ? (
        <p>Sorry this country hasn't been recognised in our database!</p>
      ) : (
        countryInfo.map((country) => <li>{country.name}</li>)
      )}

      {/* <CountryCard countryInfo={countryInfo} /> */}
    </div>
  );
};

export default Home;
