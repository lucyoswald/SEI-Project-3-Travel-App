import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Header from "../components/Header";
import Signup from "../pages/SignUp";
import CountryPage from "../pages/CountryPage";
import AllCountries from "../pages/AllCountries";

{
  /* <style>

  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
</style>; */
}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="countries/:id" element={<CountryPage />} />

        <Route path="/countries" element={<AllCountries />} />
        <Route path="/signup" className="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
