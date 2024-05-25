import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import '../Foods/Food.jsx'
import './AddFood.css'

function AddFood() {
  const { addNewFood } = useContext(FoodContext);
  const [newFood, setNewFood] = useState({
    id: Date.now().toString(),
    name: "",
    category: "",
    description: "",
    day: "Lunes",
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
    navigate("/food");
  };

  return (
    <div className="addFood">
      <h1>Agrega una nueva comida</h1>
      <form className="addFoodBox" onSubmit={handleSubmit}>
       
        <div className="fields">
          <label>Nombre:</label>
          <input type="text" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} />
        </div>
        <div className="fields">
          <label>Categoría:</label>
          <select value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}>
            <option value="">Selecciona </option>
            <option value="Desayuno">Desayuno</option>
            <option value="Comida">Comida</option>
            <option value="Cena">Cena</option>
          </select>
        </div>
        <div className="fields">
          <label>Ingredientes:</label>
          <input type="text" value={newFood.description} onChange={(e) => setNewFood({ ...newFood, description: e.target.value })} />
        </div>
        <button type="submit">Agregar Comida</button>
      </form>
      <button onClick={() => navigate("/food")}>Volver a mis comidas</button>
    </div>
  );
}

export default AddFood;
