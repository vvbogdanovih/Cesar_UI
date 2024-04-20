import './login.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

type LoginPrpos = {
  name: string;
  phone: number;
}

const Login = ({name}:LoginPrpos) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      // Дійшовши до цього пункту, логін успішний
      console.log('Успішний логін:', response.data);
    } catch (error) {
      setError('Помилка під час логіну: ');
    }
  };
  
  return(
    <div className="login-page">
      <h2>Sign In</h2>
      <div>      
      {error && <div className="error">{error}</div>}
      <form className='form-page' onSubmit={handleLogin}>
        <div >          
          <input className='input-page' type="text" placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div >          
          <input className='input-page' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p onClick={() => navigate('/registration')}>Register</p>
      </div>
      
    </div>
  );
}

export default Login;