import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import LoginModal from './LoginModal';

export default function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function handleLogout() {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  }

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Herramientas', path: '/herramientas' },
    { name: 'Recetas', path: '/recetas' },
    { name: 'Consulta', path: '/consulta' },
    ...(isLoggedIn ? [{ name: 'Mis Cursos', path: '/mis-cursos' }] : []),
    ...(isAdmin ? [{ name: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-subtitle">NUTRIÓLOGA</span>
          <span className="brand-title">Brenda Cherety</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="navbar-actions hidden md:flex">
          {isLoggedIn ? (
            <>
              <Link to="/perfil" className="navbar-user" style={{ textDecoration: 'none' }}>Hola, {user.name.split(' ')[0]}</Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                Salir
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn btn-ghost btn-sm">
                Iniciar Sesión
              </button>
              <button onClick={() => navigate('/registro')} className="btn btn-primary btn-sm">
                Comenzar
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''} md:hidden`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link block py-2 ${location.pathname === link.path ? 'text-pink' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <div className="text-sm text-gray text-center">Hola, {user.name}</div>
                <button onClick={handleLogout} className="btn btn-secondary w-full">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="btn btn-secondary w-full">
                  Iniciar Sesión
                </button>
                <button onClick={() => { navigate('/registro'); setMobileMenuOpen(false); }} className="btn btn-primary w-full">
                  Comenzar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
}
