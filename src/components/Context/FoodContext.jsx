import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crea el contexto
export const FoodContext = createContext();

// Proveedor de contexto
export const FoodProvider = ({ children }) => {
  const [listFoods, setListFoods] = useState([]);

  useEffect(() => {
    axios.get("https://664ce655ede9a2b55652075c.mockapi.io/foods")
      .then(response => {
        setListFoods(response.data);
      });
  }, []);

  return (
    <FoodContext.Provider value={listFoods}>
      {children}
    </FoodContext.Provider>
  );
};


export default FoodContext
