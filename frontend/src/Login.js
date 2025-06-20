import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const manejarClick = () => {
        navigate('/notes');
    };

    return (
        <div>
        <h2>Login</h2>
        <input
            type="text"
            placeholder="Nombre de Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
        />
        <br /><br />
        <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
        />
        <br /><br />
        <button onClick={manejarClick}>Iniciar Sesión</button>
        </div>
    );
}

export default Login;
