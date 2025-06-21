import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register (){
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const navigate = useNavigate();

    const manejarRegistro = () => {
        if (usuario.trim() === '' || contrasena.trim() === '') {
        alert('Completa todos los campos');
        return;
        }

        fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usuario, password: contrasena })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'Usuario registrado') {
            alert('Registro exitoso');
            navigate("/login");
            } else {
            alert(data.message);
            }
        })
        .catch(err => {
            console.error('Error al registrar:', err);
            alert('Ocurrió un error');
        });
    };    


    const manejarCheckbox = (e) => {
        setMostrar(e.target.checked); // true si está tildado
    };


    return (
        <div className='container'>
        <h2>Registro</h2>
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
        <div className="checkbox-container">
            <input
                type="checkbox"
                checked={mostrar}
                onChange={manejarCheckbox}
                id="mostrarPass"
            />
            <label htmlFor="mostrarPass">Mostrar contraseña</label>
        </div>
        <br /><br />
        <button class="login-btn" onClick={manejarRegistro}>Registrarse</button>
        <br /><br />
        <span>¿Ya tienes cuenta? <Link to="/login">¡Inicia sesión aquí!</Link></span>
        </div>
    );


}

export default Register;