import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, X } from 'lucide-react';


export default function LoginModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setError('');
            setEmail('');
            setPassword('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(email, password);
            onClose(); // Close modal on success
            navigate('/'); // Optional: ensure we are on a valid page, or just stay where we are
        } catch (err) {
            setError('Credenciales invalidas');
        }
    }

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content - Pixel Perfect Copy of LoginPage Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 animate-fade-in-up">

                {/* Header */}
                <div className="h-32 bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/40 blur-xl" />
                        <div className="absolute bottom-0 right-8 w-32 h-32 rounded-full bg-pink-300/40 blur-2xl" />
                    </div>

                    <div className="absolute bottom-4 left-6">
                        <span className="text-[10px] tracking-[0.3em] text-gray-600 font-light block mb-1">NUTRIÓLOGA</span>
                        <p className="text-2xl font-serif italic text-gray-800" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Cherety</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    <h2 className="text-2xl font-light text-gray-800 mb-2">Bienvenida de vuelta</h2>
                    <p className="text-sm text-gray-500 mb-8">Continúa tu camino hacia el bienestar</p>

                    {error && <div className="alert alert-error mb-4">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-400 transition-colors" />
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-pink-300 focus:bg-white transition-all placeholder:text-gray-400"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-400 transition-colors" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Contraseña"
                                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-pink-300 focus:bg-white transition-all placeholder:text-gray-400"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button type="button" className="text-sm text-pink-400 hover:text-pink-500 transition-colors">¿Olvidaste tu contraseña?</button>

                        <button type="submit" className="w-full py-4 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                            Iniciar Sesión
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            ¿No tienes cuenta?
                            <Link to="/registro" className="ml-2 text-pink-400 hover:text-pink-500 font-medium transition-colors" onClick={onClose}>
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
