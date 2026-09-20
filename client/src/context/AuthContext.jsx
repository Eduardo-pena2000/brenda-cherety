import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      apiFetch('/auth/me')
        .then(data => setUser(data.user))
        .catch(() => {
          sessionStorage.removeItem('token');
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  async function login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    sessionStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(email, password, name) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    sessionStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    sessionStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, isLoggedIn, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
