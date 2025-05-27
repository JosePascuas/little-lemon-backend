const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "-05:00",
});

db.on('connection', (connection) => {
  connection.query("SET time_zone = '-05:00'", (err) => {
    if (err) console.error('Error al cambiar zona horaria en nueva conexión:', err);
    else console.log('Zona horaria para nueva conexión establecida a -05:00');
  });
});

module.exports = db;