import "./Main.css";
import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Body from "./Body/Body";
import { useNavigate } from "react-router-dom";

const isAuth = () => {
  if (localStorage.getItem("Token") != null) {
    return true;
  }
  return false;
};

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) navigate("/logination");
  }, []);

  return (
    <div className="Main">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default Main;
