import bcrypt from 'bcrypt';
import db from './database.js';

const adminEmail = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.SEED_ADMIN_PASSWORD;
const adminName = process.env.SEED_ADMIN_NAME?.trim() || 'Administrador';

if (!adminEmail || !adminPassword) {
  console.log('SEED_ADMIN_EMAIL y SEED_ADMIN_PASSWORD no configurados; omitiendo creación automática de administrador.');
} else {
  const existing = db.prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE').get(adminEmail);

  if (existing) {
    console.log('El usuario admin ya existe.');
  } else {
    const hash = await bcrypt.hash(adminPassword, 10);
    db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
      adminEmail, hash, adminName, 'admin'
    );
    console.log('Usuario admin creado:', adminEmail);
  }
}

console.log('Base de datos lista.');
