// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend corriendo 🎉');
});

// Ruta para insertar una reserva
app.post('/reserva', (req, res) => {
  const { nombre, numero, fecha, hora, personas, ocasion } = req.body;

  const sql = 'INSERT INTO reservas (nombre, fecha, hora, personas) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, numero, fecha, hora, personas, ocasion], (err, result) => {
    if (err) {
      console.error('Error al insertar:', err);
      return res.status(500).json({ error: 'Error al guardar la reserva' });
    }
    res.json({ success: true, id: result.insertId });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});