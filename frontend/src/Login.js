import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const navigate = useNavigate();

    const manejarClick = () => {
        navigate('/notes');
    };

    const manejarCheckbox = (e) => {
        setMostrar(e.target.checked); // true si está tildado
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
            type={mostrar ? 'text' : 'password'}
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
        />
        <label>
            <input type="checkbox" checked={mostrar} onChange={manejarCheckbox} />
        </label>
        <br /><br />
        <button onClick={manejarClick}>Iniciar Sesión</button>
        <br /><br />
        <span>¿No tienes cuenta? <Link to="/register">¡Regístrate aquí!</Link></span>
        </div>
    );
}

export default Login;
