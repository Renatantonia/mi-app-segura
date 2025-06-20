import { useState } from 'react';

function Notes() {
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState([]);

  const guardarNota = () => {
    if (nota.trim() !== '') {
      const nuevaNota = {
        id: Date.now(), // id único
        contenido: nota,
      };
      setNotas([...notas, nuevaNota]);
      setNota('');
    }
  };

  const eliminarNota = (id) => {
    const nuevasNotas = notas.filter((n) => n.id !== id);
    setNotas(nuevasNotas);
  };

  return (
    <div>
      <h2>Bienvenido a Notas</h2>

      {/* Contenedor scroll */}
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
            <p style={{ fontStyle: 'italic', color: 'gray' }}>
              Falta conectar backend para ver informacion.
            </p>
            <button onClick={() => eliminarNota(n.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Escribe una nota..."
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        rows={6}
        cols={40}
      />
      <br /><br />
      <button onClick={guardarNota}>Crear Nota</button>
    </div>
  );
}

export default Notes;
