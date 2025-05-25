const db = require('./db');

const sql = `
CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  numero VARCHAR(20),
  fecha DATE,
  hora TIME,
  personas INT,
  ocasion VARCHAR(100)
);
`;

db.query(sql, (err) => {
  if (err) throw err;
  console.log('✅ Tabla "reservas" creada con todos los campos');
  process.exit();
});
