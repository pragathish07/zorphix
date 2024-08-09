"use client";

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/page";
import LoginPage from "./login/page";
import AttendancePage from "./attendence/page";
import "../app/globals.css";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </Router>
  );
};

export default App;
