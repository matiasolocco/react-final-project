import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "./Context/FoodContext";
import { MenuContext } from "./Context/MenuContext";
import '../scss/Profile.css'

function Profile() {
  const { foods } = useContext(FoodContext);
  const { weeklyMenus } = useContext(MenuContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Foods:", foods);
    console.log("WeeklyMenus:", weeklyMenus);
  }, [foods, weeklyMenus]);

  if (!foods || foods.length === 0) {
    return <div>Loading...</div>;
  }

  if (!weeklyMenus || weeklyMenus.length === 0) {
    return (
      <div>
        <h2>Comienza a planificar tu semana!</h2>
        <div className="buttons">
          <button onClick={() => navigate("/add-menu")}>Agregar Menú Semanal</button>
          <button onClick={() => navigate("/add-food")}>Agregar Comida</button>
        </div>
      </div>
    );
  }

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <div>
      <h1>Mis Menús Semanales</h1>
      {weeklyMenus.map((menu, index) => (
        <div key={index}>
          <h2>Semana: {menu.week}</h2>
          {daysOfWeek.map(day => (
            <div key={day}>
              <h3>{day}</h3>
              {["Desayuno", "Comida", "Cena"].map(category => (
                <div key={category}>
                  <h4>{category}</h4>
                  <ul>
                    {menu.menus[day][category].map((food, idx) => (
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
        </div>
      ))}
      <button onClick={() => navigate("/add-menu")}>Agregar Menú Semanal</button>
     <button onClick={() => navigate("/add-food")}>Agregar Comida</button>
    </div>
    
  );
}

export default Profile;