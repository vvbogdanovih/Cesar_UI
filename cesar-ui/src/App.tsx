import React from 'react';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        
        <Route 
          element={<div className='AppLogin'><Login name={"Jusepe"} phone={4654}/></div>}
          path="/logination"/>

        <Route 
          element={<div className='AppLogin'><Register name={"Jusepe"} phone={4654}/></div>}
          path="/registration"/>
        
      </Routes>

      </BrowserRouter>
      
        
        
      
    </div>
  );
}

export default App;
