import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Header from "../components/Header";

import CountryPage from "../pages/CountryPage";

<style>

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

      </Routes>
    </div>
  );
}

export default App;
