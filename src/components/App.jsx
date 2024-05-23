import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import AuthRoute from "./AuthRoute/AuthRoute";
import Profile from "./Profile";
import AddMenu from "./Menu/AddMenu";
import AddFood from "./Foods/AddFood";
import Menu from "./Menu/Menu";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home"; // Importamos el componente Home
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
          {user && <NavBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login listUsers={listUsers} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<AuthRoute user={user} component={<Profile />} />} />
            <Route path="/add-menu" element={<AuthRoute user={user} component={<AddMenu />} />} />
            <Route path="/add-food" element={<AuthRoute user={user} component={<AddFood />} />} />
            <Route path="/menu" element={<AuthRoute user={user} component={<Menu />} />} />
          </Routes>
        </div>
      </MenuProvider>
    </FoodProvider>
  );
}

export default App;
