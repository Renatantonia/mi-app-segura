import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Login() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const navigate = useNavigate();

    const manejarLogin = () => {
        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usuario, password: contrasena }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Login exitoso') {
                alert('Bienvenido ' + data.user.username);
                navigate('/notes');
                } else {
                alert(data.message);
                }
            })
            .catch(err => {
                console.error('Error en login:', err);
                alert('Error al conectar con el servidor');
            });
    };


    const manejarCheckbox = (e) => {
        setMostrar(e.target.checked); 
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
        <button onClick={manejarLogin }>Iniciar Sesión</button>
        <br /><br />
        <span>¿No tienes cuenta? <Link to="/register">¡Regístrate aquí!</Link></span>
        </div>
    );
}

export default Login;
