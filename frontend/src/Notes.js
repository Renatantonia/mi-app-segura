import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Notes() {
  const [nota, setNota] = useState('');
  const [titulo, setTitulo] = useState('');
  const [notas, setNotas] = useState([]);
    const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');

  useEffect(() => {
    fetch(`http://localhost:3001/api/notes?user=${usuario}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotas(data);
        } else {
          console.error('Respuesta no es un arreglo:', data);
          setNotas([]);
        }
      })
      .catch(err => {
        console.error('Error al cargar notas:', err);
        setNotas([]);
      });
  }, [usuario]);

  const guardarNota = () => {
    if (titulo.trim() === '' || nota.trim() === '') return;

    const nuevaNota = { title: titulo, content: nota, user: usuario };

    fetch('http://localhost:3001/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaNota),
    })
      .then(res => res.json())
      .then(data => {
        if (data.nota) {
          setNotas(prev => [...prev, data.nota]);
        }
        setTitulo('');
        setNota('');
      })
      .catch(err => console.error('Error al guardar:', err));
  };

  const eliminarNota = (id) => {
    fetch(`http://localhost:3001/api/notes/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar');
        setNotas(prev => prev.filter(n => n.id !== id));
      })
      .catch(err => console.error(err));
  };

    const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login', { replace: true }); 
    };


  return (
    <div>
      <h2>Bienvenido a Notas</h2>

      {/* Contenedor scroll horizontal */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '10px',
          gap: '10px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          maxWidth: '100%',
        }}
      >
        {notas.map((n) => (
          <div
            key={n.id}
            style={{
              minWidth: '250px',
              border: '1px solid gray',
              padding: '10px',
              borderRadius: '8px',
              background: '#f9f9f9',
              flexShrink: 0,
            }}
          >
            <h4>{n.title}</h4>
            <p>{n.content}</p>
            <button onClick={() => eliminarNota(n.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <br />

      <textarea
        placeholder="Escribe una nota..."
        value={nota}
        onChange={e => setNota(e.target.value)}
        rows={6}
        cols={40}
      />
      <br /><br />
      <button onClick={guardarNota}>Crear Nota</button>
        <br /><br />
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
    </div>
  );
}

export default Notes;

