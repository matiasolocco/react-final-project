import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
export const FoodContext = createContext();

// Proveedor de contexto
export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get("https://664ce655ede9a2b55652075c.mockapi.io/foods")
      .then(response => {
        console.log('Datos de la API:', response.data); // Verificar los datos obtenidos
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

  return (
    <FoodContext.Provider value={{ foods, addNewFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContext;
