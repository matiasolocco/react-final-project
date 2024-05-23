import React, { useContext } from "react";
import { FoodContext } from "../Context/FoodContext";

function Menu() {
  const { weeklyMenus } = useContext(FoodContext);

  if (weeklyMenus.length === 0) {
    return <div>Loading...</div>;
  }

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  
  const foodByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = weeklyMenus.filter(food => food.day === day);
    return acc;
  }, {});

  return (
    <div>
      <h1>Week Menu</h1>
      {daysOfWeek.map(day => (
        <div key={day}>
          <h2>{day}</h2>
          <ul>
            {foodByDay[day].slice(0, 3).map(food => (
              <li key={food.id}>
                <div>{food.name}</div>
                <div>{food.category}</div>
                <div>{food.description}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Menu;
