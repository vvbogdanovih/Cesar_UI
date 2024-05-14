import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../ApiAdres";

const Register = () => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    if(Password === password2){
      try {
        const response = await axios.post(`${api}/api/Authenticate/register`, { Username, Email, Password });
        // Дійшовши до цього пункту, логін успішний
        console.log("Успішний логін:", response.data);
      } catch (error) {
        setError("Помилка під час реєстоації:\n" + error);
      }
    }
    else{
      alert("Паролі не збігаються");
    }
    
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <div>
        {error && <div className="error">{error}</div>}
        <form className="form-page" onSubmit={(e) => handleLogin(e)}>
          <div>
            <input
              className="input-page"
              type="text"
              placeholder="Name"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-page"
              type="text"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-page"
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-page"
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <p onClick={() => navigate("/logination")}>LogIn</p>
    </div>
  );
};

export default Register;
