import { useEffect, useState } from "react";
import axios from "axios";
import home_background_image from "../assets/Pretty archway.jpg";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../consts";
import LoadingVisual from "../components/LoadingVisual";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchForm, setSearchForm] = useState([]);
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setSearchName(e.target.value);
    console.log(e.target.value);
  };
  console.log(searchName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/countries?name=${searchName}`
        );
        const countryData = data.data;
        console.log(countryData);
        const cleanedData = countryData.map((country) => {
          return {
            countryName: country.name,
            countryId: country._id,
          };
        });
        setIsLoading(false);
        setSearchForm(cleanedData);
      } catch (e) {
        console.log("This isn't working");
        setShowError(true);
        setIsLoading(false);
      }
    };
    fetchData();
    console.log(searchForm);
  }, [searchName]);

  function onSubmitForm(e) {
    e.preventDefault();
    const inputVal = e.target.elements.country.value.trim();
    if (inputVal) {
      const filteredCountry = searchForm.filter((country) =>
        country.countryName.toLowerCase().includes(inputVal.toLowerCase())
      );
      if (filteredCountry.length > 0) {
        console.log(filteredCountry[0].countryId);
        navigate(`/countries/${filteredCountry[0].countryId}`);
      } else {
        setShowError(true);
      }
    }
  }

  return (
    <div className="home">
      {isLoading ? (
        <div className="loading">
          <LoadingVisual />
        </div>
      ) : (
        <>
          <img
            src={home_background_image}
            alt="Background image"
            className="home_background_image"
          />

          <h4 className="home_header">Where would you like to go?</h4>

          <section>
            <form className="input_form" onSubmit={onSubmitForm}>
              <input
                className="country_search"
                type="text"
                placeholder="Type in your country..."
                onChange={onChange}
                name="country"
              ></input>

              <button type="submit" className="submit_button">
                Submit
              </button>
            </form>
            {showError && (
              <div className="container p-5 error">
                <div
                  className="alert alert-danger alert-dismissible fade show errorbox"
                  role="alert"
                >
                  <strong>
                    We apologize, the country you have selected cannot be found
                    within our database
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
        </>
      )}
    </div>
  );
};

export default Home;
