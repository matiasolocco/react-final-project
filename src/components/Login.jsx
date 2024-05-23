import React, { useState } from "react";

function Login({ setUser, listUsers }) {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const handleInput = (ev) => {
    const { id, value } = ev.target;
    setUserLogin({ ...userLogin, [id]: value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    if (!listUsers || listUsers.length === 0) {
      console.error("Error: listUsers no está definido o está vacío.");
      return;
    }
    const findUser = listUsers.find(
      (user) => user.email === userLogin.email && user.password === userLogin.password
    );
    if (findUser) {
      setUser(findUser);
    } else {
      console.error("Error: Usuario no encontrado.");
    }
  };

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" onChange={handleInput} value={userLogin.email} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" onChange={handleInput} value={userLogin.password} />
      <button type="submit" onClick={handleClick}>
        Iniciar sesión
      </button>
    </form>
  );
}

export default Login;
