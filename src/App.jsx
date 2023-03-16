import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../components/Home";
import Header from "../components/Header";
import Signup from "../components/SignUp";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
</style>;

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
