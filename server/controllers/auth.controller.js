import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from '../db/database.js';
import { sendPasswordResetEmail } from '../lib/mail.js';
import { signSessionToken } from '../middleware/auth.js';
import { getSafeClientUrl } from '../lib/urls.js';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function register(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password || !name || !name.trim()) {
    return res.status(400).json({ error: 'Email, password y nombre son requeridos' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res.status(400).json({ error: 'El formato del correo electrónico no es válido' });
  }

  if (String(password).length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE').get(normalizedEmail);
  if (existing) {
    return res.status(400).json({ error: 'El email ya esta registrado' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const cleanName = name.trim();
  const result = db.prepare(
    'INSERT INTO users (email, password, name, token_version) VALUES (?, ?, ?, 0)'
  ).run(normalizedEmail, hash, cleanName);

  const user = { id: result.lastInsertRowid, email: normalizedEmail, name: cleanName, role: 'student', token_version: 0 };
  const token = signSessionToken(user);

  res.status(201).json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  });
}

export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE').get(normalizedEmail);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales invalidas' });
  }

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Credenciales invalidas' });
  }

  const token = signSessionToken(user);
  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };

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

  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' });
  }

  const user = db.prepare('SELECT id, email, name, role, password FROM users WHERE id = ?').get(userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const valid = bcrypt.compareSync(currentPassword, user.password);
  if (!valid) {
    return res.status(400).json({ error: 'La contraseña actual no es correcta' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?').run(hash, userId);

  const updatedUser = db.prepare('SELECT id, email, name, role, token_version FROM users WHERE id = ?').get(userId);
  const token = signSessionToken(updatedUser);

  res.json({ success: true, message: 'Contraseña actualizada con éxito', token });
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

  const cleanEmail = email.trim().toLowerCase();
  const user = db.prepare('SELECT id, name, email FROM users WHERE email = ? COLLATE NOCASE').get(cleanEmail);

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    db.prepare('UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0').run(user.id);
    db.prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, datetime('now', '+1 hour'))").run(user.id, token);

    const clientUrl = getSafeClientUrl(req.headers.origin);
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

  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 8 caracteres' });
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
  db.prepare('UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?').run(hash, record.user_id);
  db.prepare('UPDATE password_resets SET used = 1 WHERE id = ?').run(record.id);

  const updatedUser = db.prepare('SELECT id, email, name, role, token_version FROM users WHERE id = ?').get(record.user_id);
  const sessionToken = signSessionToken(updatedUser);
  const payload = { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, role: updatedUser.role };

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

  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
  }

  const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?').run(hash, userId);

  res.json({ success: true, message: `Contraseña actualizada para ${user.email}` });
}
