import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
import "../css/Login.css";

export const Login = () => {
    const { login } = useContext(AdminContext);
    const navigate = useNavigate();
    
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [sector, setSector] = useState('Soporte'); 
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 

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

                <Select
                    className="login-select"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                >
                    <MenuItem value="Soporte">Soporte</MenuItem>
                    <MenuItem value="Gerencia">Gerencia</MenuItem>
                </Select>
                
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};