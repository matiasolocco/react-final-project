import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const FoodContext = createContext();

// Proveedor de contexto
export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [weeklyMenus, setWeeklyMenus] = useState([]);

  useEffect(() => {
    axios.get("https://664ce655ede9a2b55652075c.mockapi.io/foods")
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  const addNewFood = (newFood) => {
    axios.post("https://664ce655ede9a2b55652075c.mockapi.io/foods", newFood)
      .then(response => {
        setFoods(prevFoods => [...prevFoods, response.data]);
      })
      .catch(error => {
        console.error('Error al agregar la nueva comida:', error);
      });
  };

  const deleteFood = (foodId) => {
    axios.delete(`https://664ce655ede9a2b55652075c.mockapi.io/foods/${foodId}`)
      .then(() => {
        setFoods(prevFoods => prevFoods.filter(food => food.id !== foodId));
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
