import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminProvider, AdminContext } from "./context/AdminContext";

import Header from "./components/layout/Header.jsx";

import { Login } from "./views/Login";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";


// Componente Middleware de Intercepción de Rutas (Punto 2)
const RutaProtegida = ({ children }) => {
  const { admin } = useContext(AdminContext);

  // Si el estado global es null, se bloquea la navegación y se redirige obligatoriamente
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const App = () => {
  return (
    <AdminProvider>

      <BrowserRouter>

        <Header />

        <Routes>

          <Route path="/login" element={<Login />} />


          {/* Ruta protegida */}
          <Route
            path="/clientes"
            element={
              <RutaProtegida>

                <div style={{ padding: "20px" }}>

                  <h3>
                    Panel de Clientes - Acceso Concedido
                  </h3>

                  <ListaClientes />

                </div>

              </RutaProtegida>
            }
          />


          <Route
            path="/clientes/:id"
            element={
              <RutaProtegida>

                <DetalleCliente />

              </RutaProtegida>
            }
          />


          {/* Captura de URLs erróneas */}
          <Route
            path="*"
            element={
              <Navigate to="/login" replace />
            }
          />


        </Routes>


      </BrowserRouter>


    </AdminProvider>
  );
};


export default App;