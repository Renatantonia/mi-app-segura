const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt'); 

app.use(cors());
app.use(express.json());

const NOTES_FILE = 'notes.json';
const USERS_FILE = 'users.json';

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
  const {user} = req.query;

  if(!user){
    return res.status(400).json({message: 'Falta el Usuario'})
  }

  const notes = loadNotes();
  const userNotes = notes.filter(n => n.user === user);
  res.json(userNotes);
});

app.post('/api/notes', (req, res) => {
  const { title, content, user } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const notes = loadNotes();

  const nuevaNota = {
    id: Date.now(),
    title,
    content,
    user,
  };

  notes.push(nuevaNota);
  saveNotes(notes);

  res.json({ message: 'Nota guardada', nota: nuevaNota });
});

// DELETE NOTAS
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


function loadUsers() {
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
  }
  return [];
} 

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }


  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword, 
    };

    users.push(newUser);
    saveUsers(users);

    res.json({ message: 'Usuario registrado', user: { id: newUser.id, username: newUser.username } });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const users = loadUsers();

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Login exitoso', user: { id: user.id, username: user.username } });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3001');
});
