import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import '../Menu/Menu.css';

function Menu() {
  const { weeklyMenus } = useContext(FoodContext);
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("");

  if (!weeklyMenus || weeklyMenus.length === 0) {
    return (
      <div className="noMenuFrame"> 
        <div className="noMenuStyle">
          <h1>Mis Menús Semanales</h1>
          <div>Aún no tienes un menú planificado</div>
          <button onClick={() => navigate("/add-menu")}>Planificar nuevo Menú</button>
          <button onClick={() => navigate("/add-food")}>Agrega una nueva comida</button>
          <button onClick={() => navigate("/food")}>Ver todas mis comidas</button>
        </div>
      </div>
    );
  }

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const filteredMenus = selectedDay
    ? weeklyMenus.map(menu => ({
        ...menu,
        menus: {
          [selectedDay]: menu.menus[selectedDay]
        }
      }))
    : weeklyMenus;

  return (
    <div className="mainMenu">
      <h1>Mis Menús Semanales</h1>
      <div className="filterContainer">
        <label htmlFor="dayFilter">Filtrar por día:</label>
        <select id="dayFilter" onChange={(e) => setSelectedDay(e.target.value)} value={selectedDay}>
          <option value="">Todos los días</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      {filteredMenus.map((menu, index) => (
        <div className="weekContainer" key={index}>
          <h2>Mes y semana: {menu.week}</h2>
          <div className="dayGrid">
            {Object.keys(menu.menus).map(day => (
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
      <div className="menuButtons">
        <button className="mainButton" onClick={() => navigate("/add-menu")}>Planificar nuevo Menú</button>
        <button onClick={() => navigate("/add-food")}>Agrega una nueva comida</button>
        <button onClick={() => navigate("/food")}>Ver todas mis comidas</button>
      </div>
    </div>
  );
}

export default Menu;
