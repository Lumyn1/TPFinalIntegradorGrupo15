/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { usuariosDb } from "../data/usuarios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Estado inicial
  const [admin, setAdmin] = useState(null);

  // Cargar sesión guardada al iniciar la aplicación
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // Login
  const login = (usuario, password) => {
    const usuarioEncontrado = usuariosDb.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {
      setAdmin(usuarioEncontrado);

      // Guardar sesión en localStorage
      localStorage.setItem(
        "admin",
        JSON.stringify(usuarioEncontrado)
      );

      return { success: true };
    }

    return {
      success: false,
      message: "Usuario o contraseña incorrectos.",
    };
  };

  // Logout
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};