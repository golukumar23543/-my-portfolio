import { Sun, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ toggleTheme, theme, onLoginClick, onAdminClick, user }: { toggleTheme?: () => void, theme?: string, onLoginClick?: () => void, onAdminClick?: () => void, user?: any }) {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Learning Hub', path: '/learning-hub' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full fixed top-0 z-[100] bg-primary-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
      <div className="flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center font-bold text-xl italic shadow-lg shadow-accent-blue/20">
              G
            </div>
            <div className="flex flex-col select-none cursor-pointer" onDoubleClick={onAdminClick}>
              <span className="font-heading font-bold text-xl leading-tight flex items-center gap-2">
                Mr. Golu <span title="India">🇮🇳</span>
              </span>
              <span className="text-accent-blue text-xs font-semibold">Developer & Educator</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden xl:flex items-center gap-6">
          {links.map((link, idx) => {
            const isActive = location.pathname === link.path;
            
            if (link.path.startsWith('/#')) {
              return (
                <a key={idx} href={link.path} className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors flex items-center gap-1 py-4`}>
                  {link.name}
                </a>
              );
            }

            return (
              <div key={idx} className="group relative">
                <Link to={link.path} className={`text-sm font-medium ${isActive ? 'text-accent-blue' : 'text-gray-300'} hover:text-white transition-colors flex items-center gap-1 py-4`}>
                  {link.name}
                </Link> 
              </div>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all hidden sm:flex active:scale-95">
            <Sun size={18} />
          </button>
          <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-green-400 hover:bg-green-400/10 transition-all hidden sm:flex">
            <MessageCircle size={18} />
          </a>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 xl:hidden rounded-lg border border-white/10 flex items-center justify-center text-gray-300 hover:text-white bg-white/5 transition-all">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-primary-dark border-b border-white/10 shadow-2xl overflow-y-auto max-h-[80vh] px-6 py-4 flex flex-col gap-2">
           {links.map((link, idx) => {
             const isActive = location.pathname === link.path;
             
             if (link.path.startsWith('/#')) {
               return (
                 <a
                    key={idx}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium ${isActive ? 'text-white bg-white/5' : 'text-gray-300'} hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors border border-transparent hover:border-white/10 flex justify-between items-center`}
                  >
                    {link.name}
                  </a>
               );
             }

             return (
               <div key={idx} className="flex flex-col">
                 <Link
                   to={link.path}
                   onClick={() => setIsMenuOpen(false)}
                   className={`text-base font-medium ${isActive ? 'text-accent-blue bg-white/5' : 'text-gray-300'} hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors border border-transparent hover:border-white/10 flex justify-between items-center`}
                 >
                   {link.name}
                 </Link>
               </div>
             );
           })}
          <div className="h-px bg-white/10 my-2"></div>
          <div className="flex justify-between items-center pb-4">
             <button onClick={toggleTheme} className="flex-1 flex justify-center py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white mr-2 active:scale-95">
               <Sun size={20} />
             </button>
             <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center py-3 border border-white/10 rounded-xl text-green-400 hover:bg-green-400/10 ml-2">
               <MessageCircle size={20} />
             </a>
          </div>
        </div>
      )}
    </nav>
  );
}
