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
import ProfileModal from './components/ProfileModal';
import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addSession } from './lib/api';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (!user) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let label = '';

      if (target.closest('button, a')) {
        const actionable = target.closest('button, a') as HTMLElement;
        label = actionable.innerText || actionable.getAttribute('aria-label') || actionable.tagName;
      } else if (target.closest('input, textarea, select')) {
        const input = target.closest('input, textarea, select') as HTMLInputElement;
        label = `Input[${input.type || input.tagName}] ${input.placeholder || ''}`;
      } else if (target.tagName.match(/H[1-6]|P|SPAN|DIV|IMG/)) {
        label = target.innerText || target.getAttribute('alt') || '';
      }
      
      const cleanLabel = label.trim().substring(0, 40).replace(/\n/g, ' ');
      if (cleanLabel) {
        addSession({ username: user.email || user.uid || 'User', action: `Clicked: ${cleanLabel}` }).catch(() => {});
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  // Handle Login Click - if user logged in, open profile, else open auth modal
  const handleLoginClick = () => {
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-primary-dark text-white selection:bg-accent-blue selection:text-white'}`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} onLoginClick={handleLoginClick} onAdminClick={() => setIsAdminOpen(true)} user={user} />
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
      {isProfileOpen && <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} />}
    </div>
  );
}

