import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { login } = useContext(AdminContext);
    const navigate = useNavigate();
    
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    // PARCHE 2: Agregamos el estado del sector que faltaba
    const [sector, setSector] = useState('Soporte'); 
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 

        // PARCHE 3: Le mandamos los TRES datos al Contexto
        const response = login(usuario, password, sector);

        if (response.success) {
            navigate('/clientes'); 
        } else {
            setError(response.message); 
        }
    };

    return (
        <div className="login-container">
            <h2>Acceso al Sistema</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="login-form">
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)} 
                    required 
                />
                
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                {/* PARCHE 4: El menú desplegable en la interfaz visual */}
                <select value={sector} onChange={(e) => setSector(e.target.value)} required>
                    <option value="Soporte">Soporte</option>
                    <option value="Gerencia">Gerencia</option>
                </select>
                
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};