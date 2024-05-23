import React, { createContext, useState, useContext } from "react";

// Crear el contexto
export const MenuContext = createContext();

// Proveedor de contexto
export const MenuProvider = ({ children }) => {
  const [weeklyMenus, setWeeklyMenus] = useState([]);

  const addNewMenu = (newMenu) => {
    setWeeklyMenus(prevMenus => [...prevMenus, newMenu]);
  };

  return (
    <MenuContext.Provider value={{ weeklyMenus, addNewMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);