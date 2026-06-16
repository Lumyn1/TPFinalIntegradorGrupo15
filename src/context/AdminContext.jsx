/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { usuariosDb } from '../data/usuarios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // El estado inicial del administrador debe ser null de forma obligatoria
    const [admin, setAdmin] = useState(null);
    useEffect(() => {
        // Verificar si hay un administrador almacenado en localStorage al cargar el componente
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, []); 

    // Función de control de acceso contra el array local
    const login = (usuario, password) => {
        const usuarioEncontrado = usuariosDb.find(
            (u) => u.usuario === usuario && u.password === password
        );

        if (usuarioEncontrado) {
            setAdmin(usuarioEncontrado); 
            return { success: true };
        } else {
            return { success: false, message: 'Usuario o contraseña incorrectos.' };
        }
    };
    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('admin');
    };

    return (
        <AdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};