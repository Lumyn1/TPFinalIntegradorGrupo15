/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { usuariosDb } from "../data/usuarios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
 //Inicialización directa para que las Rutas no colapsen
  const [admin, setAdmin] = useState(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      return storedAdmin ? JSON.parse(storedAdmin) : null;
    } catch (error) {
      localStorage.removeItem("admin");
      return null;
    }
  });

  // Login (Recibe usuario, password y el sector del menú desplegable)
  const login = (usuario, password, sector) => {
    const usuarioEncontrado = usuariosDb.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (usuarioEncontrado) {
      // Validación estricta del menú desplegable
      if (usuarioEncontrado.rol !== sector) {
        return { 
          success: false, 
          message: "El sector seleccionado es incorrecto para este usuario." 
        };
      }

      setAdmin(usuarioEncontrado);

      // Guardar sesión en localStorage
      localStorage.setItem("admin", JSON.stringify(usuarioEncontrado));

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