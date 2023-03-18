import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../consts.js";

const CountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState();
  //   const [countryInfo, setCountryInfo] = useState({
  //     Country: "",
  //     Currency: "",
  //     image: "",
  //   });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${API_URL}/countries/${id}`);
      setCountry(data);
      //   setCountryInfo(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="country">
      {country ? (
        <section className="country__info">
          <h3>{country.name}</h3>
          <h4>{country.currencyName}</h4>
          <h4>{country.continent}</h4>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryPage;
