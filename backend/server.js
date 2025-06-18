const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const NOTES_FILE = 'notes.json';

// Cargar notas desde archivo
function loadNotes() {
  if (fs.existsSync(NOTES_FILE)) {
    const data = fs.readFileSync(NOTES_FILE);
    return JSON.parse(data);
  }
  return [];
}

// Guardar notas en archivo
function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

// Endpoints
app.get('/api/notes', (req, res) => {
  res.json(loadNotes());
});

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  const notes = loadNotes();
  notes.push({ title, content });
  saveNotes(notes);
  res.json({ message: 'Nota guardada' });
});

app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3001');
});
