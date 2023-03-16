import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
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
      const { data } = await axios.get(
        `http://localhost:6000/countries${formData.country}`,
        formData
      );
      console.log(data);
      setCountryInfo(data);
      localStorage.setItem("token", data.token);
    } catch (e) {
      setShowError(true);
    }
  };

  return (
    <div className="home">
      <h1 className="home_header">Where would you like to go?</h1>

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
          <button>Submit</button>
        </form>
      </section>
      {/* <CountryCard countryInfo={countryInfo} /> */}
    </div>
  );
};

export default Home;
