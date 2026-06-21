import { createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";

import App from "../App";

import { AdminContext } from "../context/AdminContext";

import { Login } from "../views/Login";
import ListaClientes from "../views/ListaClientes";
import DetalleCliente from "../views/DetalleCliente";

const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "clientes",
        element: (
          <RutaProtegida>
            <ListaClientes />
          </RutaProtegida>
        ),
      },

      {
        path: "clientes/:id",
        element: (
          <RutaProtegida>
            <DetalleCliente />
          </RutaProtegida>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;