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
        {/* Formulario para agregar comida */}
      </form>

      <h2>Mis Comidas</h2>
      <ul>
        {/* Lista de comidas */}
      </ul>

      {/* Botones de navegación */}
      <button onClick={() => navigate("/add-menu")}>Volver a Menu</button>
      <button onClick={() => navigate("/profile")}>Volver a mi Perfil</button>
    </div>
  );
}

export default AddFood;