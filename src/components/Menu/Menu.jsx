import React, { useContext } from "react";
import { MenuContext } from "../Context/MenuContext";
import '../Menu/Menu.css';

function Menu() {
  const { weeklyMenus } = useContext(MenuContext);

  if (!weeklyMenus || weeklyMenus.length === 0) {
    return <div>Loading...</div>;
  }

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <div className="form">
      <h1>Mis Menús Semanales</h1>
      {weeklyMenus.map((menu, index) => (
        <div className="weekContainer" key={index}>
          <h2>Semana: {menu.week}</h2>
          {daysOfWeek.map(day => (
            <div className="dayContainer" key={day}>
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
    </div>
  );
}

export default Menu;
