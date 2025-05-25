const db = require('./db');

const sql = `
CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  fecha DATE,
  hora TIME,
  personas INT
);
`;

db.query(sql, (err) => {
  if (err) throw err;
  console.log('✅ Tabla "reservas" creada');
  process.exit();
});