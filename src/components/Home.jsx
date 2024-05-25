import React from "react";
import { Link } from "react-router-dom";
import '../scss/Home.css'

function Home() {
  return (
    <div className="frame">
      <div className="background">
        <div className="homeStyle">
          <div className="logo">
            <h1 >My Food Planner</h1>
          </div>
          <div className="slogan"> Comienza a planificar tu menu semanal!  </div>
          <div className="loginButton">
              <Link to="/login">Iniciar Sesión</Link>
          </div>
          <div className="registerButton">
              <Link to="/register">Registrarme</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;