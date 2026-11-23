import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../db/database.js';
import { sendPasswordResetEmail } from '../lib/mail.js';

export function register(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password y nombre son requeridos' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ error: 'El email ya esta registrado' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)'
  ).run(email, hash, name);

  const user = { id: result.lastInsertRowid, email, name, role: 'student' };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ token, user });
}

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales invalidas' });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Credenciales invalidas' });
  }

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user: payload });
}

export function me(req, res) {
  const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({ user });
}

export function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Debes proporcionar la contraseña actual y la nueva' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
  }

  const user = db.prepare('SELECT id, password FROM users WHERE id = ?').get(userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const valid = bcrypt.compareSync(currentPassword, user.password);
  if (!valid) {
    return res.status(400).json({ error: 'La contraseña actual no es correcta' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, userId);

  res.json({ success: true, message: 'Contraseña actualizada con éxito' });
}

export function updateProfile(req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'El nombre no puede estar vacío' });
  }

  db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim(), userId);
  const updatedUser = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(userId);

  res.json({ success: true, user: updatedUser });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'El correo electrónico es requerido' });
  }

  const cleanEmail = email.trim();
  const user = db.prepare('SELECT id, name, email FROM users WHERE email = ? COLLATE NOCASE').get(cleanEmail);

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    db.prepare('UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0').run(user.id);
    db.prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, datetime('now', '+1 hour'))").run(user.id, token);

    let clientUrl = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';
    if (!clientUrl.startsWith('http')) clientUrl = 'https://' + clientUrl;
    const resetUrl = `${clientUrl}/restablecer-contrasena?token=${token}`;

    sendPasswordResetEmail(user.email, user.name, resetUrl).catch(console.error);
  }

  res.json({
    success: true,
    message: 'Si el correo electrónico existe en nuestra plataforma, recibirás un enlace para restablecer tu contraseña en breve.'
  });
}

export function validateResetToken(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ valid: false, error: 'Token no proporcionado' });
  }

  const record = db.prepare(`
    SELECT r.id, u.email 
    FROM password_resets r 
    JOIN users u ON u.id = r.user_id 
    WHERE r.token = ? AND r.used = 0 AND datetime(r.expires_at) > datetime('now')
  `).get(token);

  if (!record) {
    return res.status(400).json({ valid: false, error: 'El enlace es inválido o ha expirado. Por favor solicita uno nuevo.' });
  }

  res.json({ valid: true, email: record.email });
}

export function resetPassword(req, res) {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token y nueva contraseña son requeridos' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
  }

  const record = db.prepare(`
    SELECT r.id, r.user_id, u.email, u.name, u.role 
    FROM password_resets r 
    JOIN users u ON u.id = r.user_id 
    WHERE r.token = ? AND r.used = 0 AND datetime(r.expires_at) > datetime('now')
  `).get(token);

  if (!record) {
    return res.status(400).json({ error: 'El enlace es inválido o ha expirado. Por favor solicita uno nuevo.' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, record.user_id);
  db.prepare('UPDATE password_resets SET used = 1 WHERE id = ?').run(record.id);

  const payload = { id: record.user_id, email: record.email, name: record.name, role: record.role };
  const sessionToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

  res.json({
    success: true,
    message: 'Contraseña actualizada con éxito.',
    token: sessionToken,
    user: payload
  });
}

export function listUsers(req, res) {
  const users = db.prepare(`
    SELECT u.id, u.name, u.email, u.role, u.created_at,
           COUNT(p.id) as purchases_count
    FROM users u
    LEFT JOIN purchases p ON p.user_id = u.id AND p.status = 'completed'
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `).all();

  res.json({ users });
}

export function adminResetPassword(req, res) {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ error: 'userId y newPassword son requeridos' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }

  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, userId);

  res.json({ success: true, message: `Contraseña actualizada para ${user.email}` });
}

