import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdminProvider, AdminContext } from './context/AdminContext';
import { Login } from './views/Login';

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
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    {/* Ejemplo de dirección bloqueada por el guardián */}
                    <Route path="/clientes" element={
                        <RutaProtegida>
                            <div style={{ padding: '20px' }}>
                                <h3>Panel de Clientes - Acceso Concedido</h3>
                            </div>
                        </RutaProtegida>
                    } />
                    
                    {/* Captura de URLs erróneas: Redirección automática al Login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AdminProvider>
    );
};

export default App;