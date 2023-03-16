import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Header from "../components/Header";
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
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<AllCountries />} />
      </Routes>
    </div>
  );
}

export default App;
