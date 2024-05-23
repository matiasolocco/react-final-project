import React, { useContext } from "react";
import { FoodContext } from "../Context/FoodContext";

function Menu() {
  const listFoods = useContext(FoodContext);

  return (
    <div>
      <h1>Week Menu</h1>
      <ul>
        {listFoods.map(food => (
          <li key={food.id}>{food.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Menu
