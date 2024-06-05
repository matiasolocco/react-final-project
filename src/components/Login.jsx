import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../scss/Login.css'
import axios from "axios";

function Login({ setUser, listUsers }) {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (ev) => {
    const { id, value } = ev.target;
    setUserLogin({ ...userLogin, [id]: value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();

    if (!listUsers || listUsers.length === 0) {
      console.error("Error: listUsers no está definido o está vacío.");
      message("Error: No hay usuarios registrados.");
      //CONEXION NODE URL LOGIN
      try {
        const response = await axios.post(`http://localhost:${PORT}/user/login`);
        console.log("Haz accedido", response.data)

      } catch (error) {
        console.error("Error al redirigir al hacer login", error);
        message("Algo ocurrió mal al intentar acceder a tu perfil")
      }
    }
    const findUser = listUsers.find(
      (user) => user.email === userLogin.email && user.password === userLogin.password
    );
    if (findUser) {
      setUser(findUser);
      try {
        navigate("/profile"); // Intentar redirigir al perfil
      } catch (error) {
        console.error("Error al redirigir al perfil:", error);
        message("Algo ocurrió mal al intentar redirigir al perfil.");
      }
    } else {
      console.error("Error: Usuario no encontrado.");
      message("Error: Usuario o contraseña erronea.");
    }
  };

  return (
  
      <div className="frameStyle">
      <div className="inputStyle">
      <h3 className="title">Bienvenid@ de nuevo!</h3>
        <form >
            <input type="text" id="email" placeholder="Correo electrónico" className="inputFields" onChange={handleInput} value={userLogin.email} />
            <input type="password" id="password" placeholder="Contraseña" className="inputFields" onChange={handleInput} value={userLogin.password} />
            <button className="loginButton" type="submit" onClick={handleClick}>
            Iniciar sesión</button> 
        </form>
        </div>
      </div>
    
  );
}

export default Login;