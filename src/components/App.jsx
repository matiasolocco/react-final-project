import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import AuthRoute from "./AuthRoute/AuthRoute";
import Profile from "./Profile";
import AddMenu from "./Menu/AddMenu";
import AddFood from "./Foods/AddFood";
import Food from "./Foods/Food"; // Importamos el componente Food
import Menu from "./Menu/Menu"; // Importamos el componente Menu
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { FoodProvider } from "./Context/FoodContext";
import "../scss/App.css"

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
    <div className="mainStyle">
      <FoodProvider>
        <div>
          {user && <NavBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login listUsers={listUsers} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<AuthRoute user={user} component={<Profile />} />} />
            <Route path="/add-menu" element={<AuthRoute user={user} component={<AddMenu />} />} />
            <Route path="/add-food" element={<AuthRoute user={user} component={<AddFood />} />} />
            <Route path="/food" element={<AuthRoute user={user} component={<Food />} />} />
            <Route path="/menu" element={<AuthRoute user={user} component={<Menu />} />} /> {/* Agregamos la ruta para Menu */}
          </Routes>
        </div>
      </FoodProvider>
    </div>
  );
}

export default App;
