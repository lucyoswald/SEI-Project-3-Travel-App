import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Signup from "../pages/SignUp";
import Login from "../pages/Login";
import CountryPage from "../pages/CountryPage";
import AllCountries from "../pages/AllCountries";
import MyItinerary from "../pages/MyItinerary";

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
        <Route path="/myitinerary" element={<MyItinerary />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
