import jwt from 'jsonwebtoken';
import db from '../db/database.js';

export function signSessionToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token_version: user.token_version ?? 0,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function signMediaToken(user) {
  return jwt.sign(
    {
      id: user.id,
      purpose: 'media',
      token_version: user.token_version ?? 0,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

function loadActiveUser(decoded) {
  const dbUser = db.prepare(
    'SELECT id, email, name, role, token_version FROM users WHERE id = ?'
  ).get(decoded.id);

  if (!dbUser) return null;
  if ((decoded.token_version ?? 0) !== (dbUser.token_version ?? 0)) return null;

  return dbUser;
}

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.purpose === 'media') {
      return res.status(401).json({ error: 'Token invalido' });
    }

    const dbUser = loadActiveUser(decoded);
    if (!dbUser) {
      return res.status(401).json({ error: 'Sesion expirada o invalida' });
    }

    req.user = dbUser;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalido' });
  }
}

export function authenticateMedia(req, res, next) {
  const header = req.headers.authorization;
  const queryToken = typeof req.query.token === 'string' ? req.query.token : '';

  let token = '';
  let fromQuery = false;

  if (header?.startsWith('Bearer ')) {
    token = header.split(' ')[1];
  } else if (queryToken) {
    token = queryToken;
    fromQuery = true;
  }

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (fromQuery && decoded.purpose !== 'media') {
      return res.status(401).json({ error: 'Token de media invalido' });
    }

    const dbUser = loadActiveUser(decoded);
    if (!dbUser) {
      return res.status(401).json({ error: 'Sesion expirada o invalida' });
    }

    req.user = dbUser;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalido' });
  }
}
