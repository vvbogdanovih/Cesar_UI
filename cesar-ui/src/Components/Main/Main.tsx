import './Main.css'
import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import { useNavigate } from 'react-router-dom';


const isAuth = () => {
  
    if(localStorage.getItem("Token") != null){
      console.log(localStorage.getItem("Token"));
        return true;
    }
    return false;
  }

const Main = () => {    
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuth()) navigate("/logination");
  },[]);
  
  return(
    <div className="Main">      
      <Header/>
    </div>
  );
}

export default Main;