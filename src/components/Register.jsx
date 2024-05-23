import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://664e259dfafad45dfadf3290.mockapi.io/users", { email, password });
      console.log("Usuario registrado:", response.data);
      alert("Registro exitoso. Ahora puede iniciar sesión.");
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Muestra un mensaje de error al usuario
      alert("Error al registrar usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
