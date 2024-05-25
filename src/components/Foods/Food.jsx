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
    <div className="mainStyle">
      <h1>Mis Comidas Guardadas</h1>
      <ul className="foodBox">
        {foods.map(food => (
          <li key={food.id} className="foodItem">
            <h3>Comida: {food.category}</h3>
            <h4>Nombre: {food.name}</h4>
            <p>Ingredientes: {food.description}</p>
            <div className='delete' onClick={() => handleDelete(food.id)}>Eliminar</div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/add-food")}>Agregar Nueva Comida</button>
    </div>
  );
}

export default Food;
