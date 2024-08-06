import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Logger from "./components/Logger";
function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tracker" element={<Logger />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
