const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db'); // o como se llame tu archivo de conexión

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('servidor backend corriendo');
});

app.post('/reservas', (req, res) => {
  const { nombre, numero, fecha, hora, personas, ocasion } = req.body;

  const query = 'INSERT INTO reservas (nombre, numero, fecha, hora, personas, ocasion) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [nombre, numero, fecha, hora, personas, ocasion], (err, result) => {
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
