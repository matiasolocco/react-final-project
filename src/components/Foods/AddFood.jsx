import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";

function AddFood() {
  const { foods, addNewFood } = useContext(FoodContext);
  const [newFood, setNewFood] = useState({
    id: Date.now().toString(),
    name: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewFood(newFood);
    setNewFood({
      id: Date.now().toString(),
      name: "",
      category: "",
      description: "",
    });
  };

  return (
    <div>
      <h1>Agregar Comida</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} />
        </div>
        <div>
          <label>Categoría:</label>
          <select value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}>
            <option value="">Elige</option>
            <option value="Desayuno">Desayuno</option>
            <option value="Comida">Comida</option>
            <option value="Cena">Cena</option>
          </select>
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" value={newFood.description} onChange={(e) => setNewFood({ ...newFood, description: e.target.value })} />
        </div>
        <button type="submit">Agregar Comida</button>
      </form>

      <h2>Mis Comidas</h2>
      <ul>
        {foods.map(food => (
          <li key={food.id}>
            <div>{food.name}</div>
            <div>{food.category}</div>
            <div>{food.description}</div>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/add-menu")}>Volver a Menu</button>
      <button onClick={() => navigate("/profile")}>Volver a mi Perfil</button>
    </div>
  );
}

export default AddFood;