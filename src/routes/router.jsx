import {createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Login } from "../views/Login";
import ListaClientes from "../views/ListaClientes";
import DetalleCliente from "../views/DetalleCliente";  

// Componente Middleware de Intercepción de Rutas (Punto 2)
const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext); 
    // Si el estado global es null, se bloquea la navegación y se redirige obligatoriamente 
    if (!admin) {
        return <Navigate to="/login" replace />; 
    }

    return children; 
};

//definicion del router
export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header />
                <Outlet />  
                <Footer />
            </> 
        ),
        children: [
            {
        path: "/login",
        element: <Login />
    },
    {
        path: "/clientes",
        element: (
            <RutaProtegida>
                <ListaClientes />
            </RutaProtegida>
        )
    },
    {
        path: "/clientes/:id",
        element: (
            <RutaProtegida>
                <DetalleCliente />
            </RutaProtegida>
        )
    },
    {path: "*", element: <Navigate to="/login" replace />,
    },
        ],
    },
]);
export default router;  