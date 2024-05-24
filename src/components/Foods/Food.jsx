import React, { useContext } from "react";
import { FoodContext } from "../Context/FoodContext";
import { useNavigate } from "react-router-dom";
import '../Foods/Food.css'; 

function Food() {
  const { foods, deleteFood } = useContext(FoodContext);
  const navigate = useNavigate();

  if (!foods || foods.length === 0) {
    return <div>Loading...</div>;
  }

  const handleDelete = (foodId) => {
    deleteFood(foodId);
  };

  return (
    <div>
      <h1>Mis Comidas</h1>
      <ul>
        {foods.map(food => (
          <li key={food.id} className="foodItem">
            <div>{food.name}</div>
            <div>{food.category}</div>
            <div>{food.description}</div>
            <button onClick={() => handleDelete(food.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/add-food")}>Agregar Comida</button>
    </div>
  );
}

export default Food;
