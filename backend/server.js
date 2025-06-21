const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_super_segura';
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const NOTES_FILE = 'notes.json';
const USERS_FILE = 'users.json';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

function loadFile(file) {
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
  }
  return [];
}

function saveFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

app.get('/api/notes', authenticateToken, (req, res) => {
  const notes = loadFile(NOTES_FILE);
  const userNotes = notes.filter(n => n.user === req.user.username);
  res.json(userNotes);
});

app.post('/api/notes', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Faltan datos' });

  const notes = loadFile(NOTES_FILE);
  const nuevaNota = {
    id: Date.now(),
    title,
    content,
    user: req.user.username,
  };

  notes.push(nuevaNota);
  saveFile(NOTES_FILE, notes);
  res.json({ message: 'Nota guardada', nota: nuevaNota });
});

app.delete('/api/notes/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  let notas = loadFile(NOTES_FILE);
  const nuevasNotas = notas.filter(nota => nota.id !== id || nota.user !== req.user.username);

  if (nuevasNotas.length === notas.length) {
    return res.status(404).json({ message: 'Nota no encontrada o no autorizada' });
  }

  saveFile(NOTES_FILE, nuevasNotas);
  res.json({ message: 'Nota eliminada' });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  const users = loadFile(USERS_FILE);
  if (users.find(u => u.username === username)) return res.status(400).json({ message: 'Usuario ya existe' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    users.push(newUser);
    saveFile(USERS_FILE, users);
    res.json({ message: 'Usuario registrado', user: { id: newUser.id, username: newUser.username } });
  } catch {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Faltan datos' });

  const users = loadFile(USERS_FILE);
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
        message: 'Login exitoso', 
        token,
        user: { username: user.username }
    });
  } catch {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});