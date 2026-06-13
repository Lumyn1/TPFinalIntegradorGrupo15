import { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { login } = useContext(AdminContext);
    const navigate = useNavigate();
    
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Limpia estados de error previos

        const response = login(usuario, password);

        if (response.success) {
            navigate('/clientes'); // Redirección al panel autorizado
        } else {
            setError(response.message); // Inyección del error en el estado local
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
                
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};