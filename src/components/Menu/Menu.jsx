import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import '../Menu/Menu.css';

function Menu() {
  const { weeklyMenus } = useContext(FoodContext);
  const navigate = useNavigate();

  if (!weeklyMenus || weeklyMenus.length === 0) {
    return (
      <div className="form">
        <h1>Mis Menús Semanales</h1>
        <div>Aún no tienes un menú planificado</div>
        <button onClick={() => navigate("/add-menu")}>Planificar nuevo Menú</button>
      </div>
    );
  }

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <div className="form">
      <h1>Mis Menús Semanales</h1>
      {weeklyMenus.map((menu, index) => (
        <div className="weekContainer" key={index}>
          <h2>Mes y semana :  {menu.week}</h2>
          <div className="dayGrid">
            {daysOfWeek.map(day => (
              <div className="dayContainer" key={day}>
                <h3>{day}</h3>
                {["Desayuno", "Comida", "Cena"].map(category => (
                  <div key={category}>
                    <h4 className="foodCategory">{category}</h4>
                    <ul className="smallFoodBox">
                      {menu.menus[day][category].map((food, i) => (
                        <li key={i}>
                          <h5>{food.name}</h5>
                          <p>Ingredientes: {food.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => navigate("/add-menu")}>Planificar nuevo Menú</button>
    </div>
  );
}

export default Menu;
