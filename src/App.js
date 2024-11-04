import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <div className="bg-[#222222] w-full h-screen">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
