import React from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Main from "./Components/Main/Main";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App-clear">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <div className="App">
                <div className="AppLogin">
                  <Login />
                </div>
              </div>
            }
            path="/logination"
          />

          <Route
            element={
              <div className="App">
                <div className="AppRegister">
                  <Register />
                </div>
              </div>
            }
            path="/registration"
          />

          <Route
            element={
              <div className="App-clear">
                <Main />
              </div>
            }
            path="/main"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
