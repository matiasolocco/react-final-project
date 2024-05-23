import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "./Context/FoodContext";

function Profile() {
  const { weeklyMenus } = useContext(FoodContext);
  const navigate = useNavigate();

  if (!weeklyMenus || weeklyMenus.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mis Menús Semanales</h1>
      {weeklyMenus.map((menu, index) => (
        <div key={index}>
          <h2>Semana: {menu.week}</h2>
          {menu.menus && Object.keys(menu.menus).map(day => (
            <div key={day}>
              <h3>{day}</h3>
              <ul>
                {menu.menus[day].map((food, idx) => (
                  <li key={idx}>
                    <div>{food.name}</div>
                    <div>{food.category}</div>
                    <div>{food.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => navigate("/add-menu")}>Agregar Menú Semanal</button>
      <button onClick={() => navigate("/add-food")}>Agregar Comida</button>
    </div>
  );
}

export default Profile;
