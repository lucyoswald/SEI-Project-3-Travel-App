import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../components/Header";
import Header from "../components/Home";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
</style>;

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
