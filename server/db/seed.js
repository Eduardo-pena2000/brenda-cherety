import bcrypt from 'bcrypt';
import db from './database.js';

const adminEmail = 'admin@brenda.com';
const adminPassword = 'admin123';
const adminName = 'Administrador';

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);

if (existing) {
  console.log('El usuario admin ya existe.');
} else {
  const hash = await bcrypt.hash(adminPassword, 10);
  db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
    adminEmail, hash, adminName, 'admin'
  );
  console.log('Usuario admin creado:');
  console.log(`  Email: ${adminEmail}`);
  console.log(`  Password: ${adminPassword}`);
}

console.log('Base de datos lista.');


