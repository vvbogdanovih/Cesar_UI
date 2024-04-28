import './Header.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {  
  
  return(
    <div className="header">      
      <button className="header-log-out-buuton">Log Out</button>
    </div>
  );
}

export default Header;