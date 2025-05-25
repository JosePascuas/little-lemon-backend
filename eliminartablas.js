const db = require('./db');

const sql = `DROP TABLE IF EXISTS reservas;`;

db.query(sql, (err) => {
  if (err) throw err;
  console.log('🗑️ Tabla "reservas" eliminada con éxito');
  process.exit();
});