import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Bienvenido</h2>
      <button>
          <Link to="/login">Iniciar Sesión</Link>
      </button>
      <button>
          <Link to="/register">Registrarme</Link>
      </button>
    </div>
  );
}

export default Home;