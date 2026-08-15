import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChatbot from './components/FloatingChatbot';
import AuthModal from './components/AuthModal';
import AdminModal from './components/AdminModal';
import ProfileModal from './components/ProfileModal';
import IndependenceDay from './components/IndependenceDay';

import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import ProductsPage from './pages/ProductsPage';
import VisualJourneyPage from './pages/VisualJourneyPage';
import FeedbackPage from './pages/FeedbackPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ServicePage from './pages/ServicePage';

import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addSession, trackPageView } from './lib/api';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    // Increment page view on load
    trackPageView();
  }, []);

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
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (isMounted) setUser(currentUser);
        
        const { getUserProfile } = await import('./lib/api');
        const dbUser = await getUserProfile(currentUser.email, currentUser.uid);
        if (dbUser && isMounted) {
          setUser({ ...currentUser, photoURL: dbUser.photoURL || currentUser.photoURL, displayName: dbUser.name || currentUser.displayName, branch: dbUser.branch || '', address: dbUser.address || '' });
        }
      } else {
        if (isMounted) setUser(null);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const handleLoginClick = () => {
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${theme === 'light' ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-primary-dark text-white selection:bg-accent-blue selection:text-white'}`}>
        <Navbar toggleTheme={toggleTheme} theme={theme} onLoginClick={handleLoginClick} onAdminClick={() => setIsAdminOpen(true)} user={user} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/visual-journey" element={<VisualJourneyPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/service/:slug" element={<ServicePage />} />
        </Routes>
        
        <Footer />
        <FloatingChatbot />
        <IndependenceDay />
        
        {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
        {isAdminOpen && <AdminModal onClose={() => setIsAdminOpen(false)} />}
        {isProfileOpen && <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} onUpdate={(updatedUser) => setUser({...updatedUser})} />}
      </div>
    </Router>
  );
}

