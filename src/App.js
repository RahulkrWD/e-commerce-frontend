import React, { useEffect } from "react";
import About from "./pages/About";
import HomePage from "./pages/HomePage/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import { Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Listing from "./pages/Listing/Listing";
import Loading from "./components/layout/Loading";
import Details from "./pages/Details/Details";
import PopUp from "./pages/PopUp";
import AddCart from "./pages/cart/AddCart";
// import Stepper from "./pages/placeOrder/Stepper";
import MyOrder from "./pages/MyOrder";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PopUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/category" element={<Listing />}></Route>
        <Route path="/loading" element={<Loading />} />
        <Route path="/details/:product" element={<Details />} />
        <Route path="/cart" element={<AddCart />} />
        {/* <Route path="/stepper" element={<Stepper />} /> */}
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;

// SEO => Search Engine Optimization
