const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const NOTES_FILE = 'notes.json';

function loadNotes() {
  if (fs.existsSync(NOTES_FILE)) {
    const data = fs.readFileSync(NOTES_FILE);
    return JSON.parse(data);
  }
  return [];
}

function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

app.get('/api/notes', (req, res) => {
  const notes = loadNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const notes = loadNotes();

  const nuevaNota = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(nuevaNota);
  saveNotes(notes);

  res.json({ message: 'Nota guardada', nota: nuevaNota });
});

// DELETE 
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id); // convertimos id a número
  let notas = loadNotes();

  const nuevasNotas = notas.filter(nota => nota.id !== id);

  if (nuevasNotas.length === notas.length) {
    return res.status(404).json({ message: 'Nota no encontrada' });
  }

  saveNotes(nuevasNotas);
  res.json({ message: 'Nota eliminada' });
});


app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3001');
});
