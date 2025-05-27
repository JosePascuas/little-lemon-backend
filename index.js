const express = require('express');
const cors = require('cors');
const db = require('./db');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://little-lemon-seven-red.vercel.app', // frontend en Vercel
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('servidor backend corriendo');
});

app.post('/reservas', (req, res) => {
  const { nombre, numero, fecha, hora, personas, ocasion } = req.body;
  console.log("Datos recibidos en backend:", req.body);

  const parsedDate = new Date(fecha);
  parsedDate.setMinutes(parsedDate.getMinutes() + parsedDate.getTimezoneOffset());
  const fechaAjustada = parsedDate.toISOString().split("T")[0];
  fecha = fechaAjustada;

  const query = 'INSERT INTO reservas (nombre, numero, fecha, hora, personas, ocasion) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [nombre, numero, fecha, hora, personas, ocasion], (err, result) => {
    if (err) {
      console.error('Error al insertar reserva:', err);
      return res.status(500).json({ error: 'Error al insertar reserva' });
    }

    res.status(200).json({ message: 'Reserva guardada correctamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
