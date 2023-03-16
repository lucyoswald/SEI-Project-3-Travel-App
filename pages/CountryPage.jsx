import axios from "axios";
import { useParams } from "react-router-dom";
const { useEffect, useState } = require("react");

const CountryPage = () => {
  const { id } = useParams();
  const { country, setCountry } = useState();
  const [formData, setFormData] = useState({
    Country: "",
    Currency: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get();
    };
  });
  return (
    <div>
      <p>This is the individual country page</p>
    </div>
  );
};

export default CountryPage;
