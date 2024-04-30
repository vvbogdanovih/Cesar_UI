import "./Footer.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p>Diploma project by Vasyliv Vladyslav 2024</p>
    </div>
  );
};

export default Footer;
