import React from "react";
import LoginPage from "./Login.jsx";
import HomePage from "./Home.jsx";
import SignupPage from "./Signup.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'; // If you haven't imported the Bootstrap CSS yet
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
