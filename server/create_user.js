import bcrypt from 'bcrypt';
import db from './db/database.js';

async function createUser() {
  const userEmail = 'paciente@ejemplo.com';
  const userPassword = 'password123';
  const userName = 'Paciente Ficticio';

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(userEmail);
  
  if (existing) {
    console.log('El usuario ficticio ya existe.');
  } else {
    const hash = await bcrypt.hash(userPassword, 10);
    db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
      userEmail, hash, userName, 'student'
    );
    console.log('Usuario ficticio creado con exito.');
  }
}

createUser();
