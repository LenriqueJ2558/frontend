import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div>
      <h1>Bienvenido a la página principal</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;