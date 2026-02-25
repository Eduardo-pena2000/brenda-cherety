import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  // Aceptar token del header o query param (para video streaming)
  const header = req.headers.authorization;
  const queryToken = req.query.token;

  let token;
  if (header?.startsWith('Bearer ')) {
    token = header.split(' ')[1];
  } else if (queryToken) {
    token = queryToken;
  }

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalido' });
  }
}
