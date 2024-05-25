import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "./Context/FoodContext";
import '../scss/Profile.css'

function Profile() {
  const { foods } = useContext(FoodContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Foods:", foods);
  }, [foods]);


  return (
    <div className="profileFrame">
      <div className="intro">
        <h2>Comienza a planificar tu semana!</h2>
        <div className="buttons">
          <button onClick={() => navigate("/menu")}>Mi Menú Semanal</button>
          <button onClick={() => navigate("/food")}>Mis Comidas</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
