import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "./Context/FoodContext";

function Profile() {
  const { foods, weeklyMenus } = useContext(FoodContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Foods:", foods);
    console.log("WeeklyMenus:", weeklyMenus);
  }, [foods, weeklyMenus]);

  if (!foods || foods.length === 0) {
    return <div>Loading...</div>;
  }

  if (!weeklyMenus || Object.keys(weeklyMenus).length === 0) {
    return (
      <div>
        <h2>No hay menús semanales disponibles.</h2>
        <button onClick={() => navigate("/add-menu")}>Agregar Menú Semanal</button>
        <button onClick={() => navigate("/add-food")}>Agregar Comida</button>
      </div>
    );
  }

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <div>
      <h1>Mis Menús Semanales</h1>
      {daysOfWeek.map(day => (
        <div key={day}>
          <h2>{day}</h2>
          <ul>
            {(weeklyMenus[day] || []).map(foodId => {
              const food = foods.find(f => f.id === foodId);
              return food ? (
                <li key={food.id}>
                  <div>{food.name}</div>
                  <div>{food.category}</div>
                  <div>{food.description}</div>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      ))}
      <button onClick={() => navigate("/add-menu")}>Agregar Menú Semanal</button>
      <button onClick={() => navigate("/add-food")}>Agregar Comida</button>
    </div>
  );
}

export default Profile;
