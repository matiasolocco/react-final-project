import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../scss/Login.css'

function Login({ setUser, listUsers }) {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (ev) => {
    const { id, value } = ev.target;
    setUserLogin({ ...userLogin, [id]: value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    if (!listUsers || listUsers.length === 0) {
      console.error("Error: listUsers no está definido o está vacío.");
      alert("Error: No hay usuarios registrados.");
      return;
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
        alert("Algo ocurrió mal al intentar redirigir al perfil.");
      }
    } else {
      console.error("Error: Usuario no encontrado.");
      alert("Error: Usuario o contraseña erronea.");
    }
  };

  return (
  
      <div className="formStyle">
        <form >
          <label className="htmlFor" htmlFor="email">Email</label>
          <input type="text" id="email" onChange={handleInput} value={userLogin.email} />
          <label className="htmlFor" htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleInput} value={userLogin.password} />
          <button className="loginButton" type="submit" onClick={handleClick}>
          Iniciar sesión</button>
        </form>
      </div>
    
  );
}

export default Login;