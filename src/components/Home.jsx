import React from "react";
import { Link } from "react-router-dom";
import '../scss/Home.css'

function Home() {
  return (
    <div className="homeStyle">
      <h1>My Food Planner</h1>
      <div className="loginButton">
          <Link to="/login">Iniciar Sesión</Link>
      </div>
      <div className="registerButton">
          <Link to="/register">Registrarme</Link>
      </div>
    </div>
  );
}

export default Home;