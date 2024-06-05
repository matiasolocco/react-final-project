import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [weeklyMenus, setWeeklyMenus] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/food/select")
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  const addNewFood = (newFood) => {
    axios.post("http://localhost:5001/food/add", newFood)
      .then(response => {
        setFoods(prevFoods => [...prevFoods, response.data]);
      })
      .catch(error => {
        console.error('Error al agregar la nueva comida:', error);
      });
  };

  const deleteFood = (foodId) => {
    console.log(`Food ID to delete: ${foodId}`); // Agrega este log para depuración
    axios.delete(`http://localhost:5001/food/delete/${foodId}`)
      .then(() => {
        setFoods(prevFoods => prevFoods.filter(food => food._id !== foodId));
      })
      .catch(error => {
        console.error('Error al eliminar la comida:', error);
      });
  };  

  const addNewMenu = (newMenu) => {
    setWeeklyMenus(prevMenus => [...prevMenus, newMenu]);
  };

  return (
    <FoodContext.Provider value={{ foods, addNewFood, deleteFood, weeklyMenus, addNewMenu }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;
