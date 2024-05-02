import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../ApiAdres";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${api}/api/Authenticate/login`,
        { username, password }
      );
      localStorage.setItem("Token", response.data.token);
      navigate("/main");
    } catch (error) {
      setError("Помилка під час логіну: ");
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <div>
        {error && <div className="error">{error}</div>}
        <form className="form-page" onSubmit={(e) => handleLogin(e)}>
          <div>
            <input
              className="input-page"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-page"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p onClick={() => navigate("/registration")}>Register</p>
      </div>
    </div>
  );
};

export default Login;
