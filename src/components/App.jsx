import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import NavBar from "./NavBar";
import AuthRoute from "./AuthRoute/AuthRoute";
import Profile from "./Profile";
import AddMenu from "./Menu/AddMenu";
import AddFood from "./Foods/AddFood";
import Menu from "./Menu/Menu";
import { FoodProvider } from "./Context/FoodContext";
import { MenuProvider } from "./Context/MenuContext";

function App() {
  const [user, setUser] = useState(null);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    axios.get("https://664e259dfafad45dfadf3290.mockapi.io/users")
      .then(response => {
        setListUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []);

  return (
    <FoodProvider>
      <MenuProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<h2>Home</h2>} />
            <Route path="/login" element={<Login listUsers={listUsers} setUser={setUser} />} />
            <Route path="/profile" element={
              <AuthRoute user={user} component={<Profile />} />
            } />
            <Route path="/add-menu" element={<AddMenu />} />
            <Route path="/add-food" element={<AddFood />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
      </MenuProvider>
    </FoodProvider>
  );
}

export default App;
