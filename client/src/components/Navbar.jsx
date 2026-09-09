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
    { name: 'Consulta personalizada', path: '/consulta' },
    { name: 'Sobre mi', path: '/sobre-mi' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-subtitle" style={{ fontFamily: "'Assistant', sans-serif", fontWeight: 200, textTransform: 'none', letterSpacing: '0.05em', fontSize: '1.2rem' }}>Nutrióloga</span>
          <span className="brand-title" style={{ fontFamily: "'Gistesy', cursive, serif", fontSize: '3rem', textTransform: 'capitalize', fontWeight: 'normal', lineHeight: 0.8 }}>Cherety</span>
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
              {isAdmin && (
                <Link to="/admin" className="nav-link" style={{ color: 'var(--primary-deep)', fontWeight: 500 }}>Panel Admin</Link>
              )}
              <Link to="/perfil" className="nav-link">Mi cuenta</Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                Salir
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="nav-link bg-transparent border-none cursor-pointer">
              Mi cuenta
            </button>
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
                {isAdmin && (
                  <Link to="/admin" className="nav-link block py-2" style={{ color: 'var(--primary-deep)', fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>Panel Admin</Link>
                )}
                <Link to="/perfil" className="nav-link block py-2" onClick={() => setMobileMenuOpen(false)}>Mi cuenta</Link>
                <button onClick={handleLogout} className="btn btn-secondary w-full">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="nav-link block py-2 text-left bg-transparent border-none">
                Mi cuenta
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
}
