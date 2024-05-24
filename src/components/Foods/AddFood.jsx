import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodContext } from "../Context/FoodContext";
import '../Foods/Food.jsx'

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
      day: "Lunes",
    });
    navigate("/food");
  };

  return (
    <div>
      <h1>Agregar Comida</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Día:</label>
          <select value={newFood.day} onChange={(e) => setNewFood({ ...newFood, day: e.target.value })}>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} />
        </div>
        <div>
          <label>Categoría:</label>
          <select value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}>
            <option value="">Selecciona una categoría</option>
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
      <button onClick={() => navigate("/food")}>Volver a mis comidas</button>
    </div>
  );
}

export default AddFood;
