import React from "react";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/Auth/ForgetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  );
}

export default App;

// SEO => Search Engine Optimization
