import React, { useContext, useState } from "react";
import { FoodContext } from "../Context/FoodContext";
import { useNavigate } from "react-router-dom";
import '../Foods/Food.css'; 

function Food() {
  const { foods, deleteFood } = useContext(FoodContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDelete = (foodId) => {
    deleteFood(foodId);
  };

  const filteredFoods = selectedCategory 
    ? foods.filter(food => food.category === selectedCategory) 
    : foods;

  return (
    <div className="mainStyle">
      <h1>Mis Comidas Guardadas</h1>
      <div className="filterContainer">
        <label htmlFor="categoryFilter">Filtrar por categoría: </label>
        <select 
          id="categoryFilter" 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          value={selectedCategory}
        >
          <option value="">Todas</option>
          {Array.from(new Set(foods.map(food => food.category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <ul className="foodBox">
        {filteredFoods.map(food => (
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
