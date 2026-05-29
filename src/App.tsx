import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Mentoring from './components/Mentoring';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AuthModal from './components/AuthModal';
import AdminModal from './components/AdminModal';
import { useState, useEffect } from 'react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-primary-dark text-white selection:bg-accent-blue selection:text-white'}`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} onLoginClick={() => setIsAuthOpen(true)} onAdminClick={() => setIsAdminOpen(true)} />
      <Hero />
      <Projects />
      <Mentoring />
      <Services />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
      
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
      {isAdminOpen && <AdminModal onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
}

