import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../scss/Register.css'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post("https://664e259dfafad45dfadf3290.mockapi.io/users", { email, password });
      console.log("Usuario registrado:", response.data);
      message("Registro exitoso. Ahora puede iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      message("Error al registrar usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="registerFrame">
      <div className="formStyle">
        <h2>Comineza a planificar tu menú semanal</h2>
        <form  onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="registerButton" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
