import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import '../Menu/AddMenu.css';

function AddMenu() {
  const { foods, addNewMenu, updateMenu } = useContext(FoodContext);
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
  const location = useLocation();
  const editingMenu = location.state ? location.state.menu : null;

  useEffect(() => {
    if (editingMenu) {
      setNewMenu(editingMenu);
    }
  }, [editingMenu]);

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
    if (editingMenu) {
      updateMenu(newMenu);
    } else {
      addNewMenu(newMenu);
    }
    navigate("/menu");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="weekContainer">
        <label>Mes y semana: </label>
        <input
          type="text"
          value={newMenu.week}
          onChange={(e) => setNewMenu({ ...newMenu, week: e.target.value })}
        />
      </div>
      {Object.keys(newMenu.menus).map(day => (
        <div className="dayContainer" key={day}>
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
              <ul>
                {newMenu.menus[day][category].map((food, i) => (
                  <li key={i}>{food.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      
      <button type="submit">{editingMenu ? "Modificar Menú" : "Agregar Menú"}</button>
      <button type="button" onClick={() => navigate("/add-food")}>Agregar Comida</button>
    </form>
  );
}

export default AddMenu;
