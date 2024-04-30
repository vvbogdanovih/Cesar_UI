import "./Header.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const LogOut = () => {
    localStorage.clear();
    navigate("/logination");
  };
  return (
    <div className="header">
      <h1 className="header-text">Cesar Banchmark</h1>
      <button className="header-log-out-buuton" onClick={LogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
