import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import CourseDetailPage from './pages/CourseDetailPage';
import MyCoursesPage from './pages/MyCoursesPage';
import LessonPlayerPage from './pages/LessonPlayerPage';
import SobreMiPage from './pages/SobreMiPage';
import BlogPage from './pages/BlogPage';
import ContactoPage from './pages/ContactoPage';
import FAQPage from './pages/FAQPage';
import PagoExitosoPage from './pages/PagoExitosoPage';
import PagoCanceladoPage from './pages/PagoCanceladoPage';
import PerfilPage from './pages/PerfilPage';
import RecetasPage from './pages/RecetasPage';
import HerramientasPage from './pages/HerramientasPage';
import ConsultaPage from './pages/ConsultaPage';
import AgendaPage from './pages/AgendaPage';
import ProgramaVipPage from './pages/ProgramaVipPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseForm from './pages/admin/AdminCourseForm';
import AdminLessons from './pages/admin/AdminLessons';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/registro'].includes(location.pathname);

  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        {!isAuthPage && <Navbar />}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/cursos" element={<CatalogPage />} />
            <Route path="/curso/:id" element={<CourseDetailPage />} />
            <Route path="/sobre-mi" element={<SobreMiPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
            <Route path="/pago-cancelado" element={<PagoCanceladoPage />} />
            <Route path="/recetas" element={<RecetasPage />} />
            <Route path="/herramientas" element={<HerramientasPage />} />
            <Route path="/consulta" element={<ConsultaPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/programa-vip" element={<ProgramaVipPage />} />

            {/* Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/mis-cursos" element={<MyCoursesPage />} />
              <Route path="/clase/:courseId/:lessonId" element={<LessonPlayerPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/cursos" element={<AdminCourses />} />
              <Route path="/admin/cursos/nuevo" element={<AdminCourseForm />} />
              <Route path="/admin/cursos/:id/editar" element={<AdminCourseForm />} />
              <Route path="/admin/cursos/:courseId/lecciones" element={<AdminLessons />} />
            </Route>
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
