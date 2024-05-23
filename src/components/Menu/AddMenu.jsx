import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import { MenuContext } from "../Context/MenuContext";
import axios from "axios";

function AddMenu() {
  const { foods } = useContext(FoodContext);
  const { addNewMenu } = useContext(MenuContext);
  const [newMenu, setNewMenu] = useState({
    week: "",
    menus: {
      Lunes: { Desayuno: [], Comida: [], Cena: [] },
      Martes: { Desayuno: [], Comida: [], Cena: [] },
      Miércoles: { Desayuno: [], Comida: [], Cena: [] },
      Jueves: { Desayuno: [], Comida: [], Cena: [] },
      Viernes: { Desayuno: [], Comida: [], Cena: [] },
      Sábado: { Desayuno: [], Comida: [], Cena: [] },
      Domingo: { Desayuno: [], Comida: [], Cena: [] },
    },
  });

  const navigate = useNavigate();

  const handleFoodSelection = (day, category, foodId) => {
    const selectedFood = foods.find(food => food.id === foodId);
    setNewMenu(prevMenu => ({
      ...prevMenu,
      menus: {
        ...prevMenu.menus,
        [day]: {
          ...prevMenu.menus[day],
          [category]: [...prevMenu.menus[day][category], selectedFood],
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewMenu(newMenu);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Semana:</label>
        <input
          type="text"
          value={newMenu.week}
          onChange={(e) => setNewMenu({ ...newMenu, week: e.target.value })}
        />
      </div>
      {Object.keys(newMenu.menus).map(day => (
        <div key={day}>
          <h3>{day}</h3>
          {["Desayuno", "Comida", "Cena"].map(category => (
            <div key={category}>
              <label>{category}:</label>
              <select onChange={(e) => handleFoodSelection(day, category, e.target.value)}>
                <option value="">Selecciona una comida</option>
                {foods.filter(food => food.category === category).map(food => (
                  <option key={food.id} value={food.id}>{food.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Agregar Menú</button>
      <button type="button" onClick={() => navigate("/add-food")}>Agregar Comida</button>
    </form>
  );
}

export default AddMenu;