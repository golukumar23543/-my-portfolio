import { Sun, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Navbar({ toggleTheme, theme, onLoginClick, onAdminClick, user }: { toggleTheme?: () => void, theme?: string, onLoginClick?: () => void, onAdminClick?: () => void, user?: any }) {
  const links = ['Home', 'About', 'Developer', 'Learning Hub', 'Services', 'Gallery', 'Contact'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-[100] bg-primary-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
      <div className="flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center font-bold text-xl italic shadow-lg shadow-accent-blue/20">
            G
          </div>
          <div className="flex flex-col select-none cursor-pointer" onDoubleClick={onAdminClick}>
            <span className="font-heading font-bold text-xl leading-tight">Mr. Golu</span>
            <span className="text-accent-blue text-xs font-semibold">Developer & Educator</span>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden xl:flex items-center gap-6">
          {links.map((link, idx) => {
            const hasDropdown = ['About', 'Developer', 'Learning Hub', 'Services'].includes(link);
            const dropdownLinks = link === 'About' ? ['My Journey', 'Mission', 'Vision'] :
                                  link === 'Developer' ? ['Projects', 'Skills', 'Tech Stack'] :
                                  link === 'Learning Hub' ? ['Tutorials', 'Resources', 'Mentorship'] :
                                  link === 'Services' ? ['Web Dev', 'Consulting', 'App Dev'] : [];
            return (
            <div key={idx} className="group relative">
              <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1 py-4">
                {link}
                {hasDropdown && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity rotate-0 group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                )}
              </a>
               {hasDropdown && (
                 <div className="absolute top-full left-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 bg-secondary-dark border border-white/10 rounded-xl p-3 shadow-xl w-48 flex flex-col gap-1 z-50">
                    {dropdownLinks.map((sub, si) => (
                      <a key={si} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors">{sub}</a>
                    ))}
                 </div>
               )}
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
             const hasDropdown = ['About', 'Developer', 'Learning Hub', 'Services'].includes(link);
             const dropdownLinks = link === 'About' ? ['My Journey', 'Mission', 'Vision'] :
                                   link === 'Developer' ? ['Projects', 'Skills', 'Tech Stack'] :
                                   link === 'Learning Hub' ? ['Tutorials', 'Resources', 'Mentorship'] :
                                   link === 'Services' ? ['Web Dev', 'Consulting', 'App Dev'] : [];
             return (
               <div key={idx} className="flex flex-col">
                 <a 
                   href={`#${link.toLowerCase().replace(' ', '-')}`} 
                   onClick={() => setIsMenuOpen(false)}
                   className="text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 p-3 rounded-xl transition-colors border border-transparent hover:border-white/10 flex justify-between items-center"
                 >
                   {link}
                 </a>
                 {hasDropdown && (
                   <div className="pl-6 pr-3 py-1 flex flex-col gap-1 border-l border-white/10 ml-4 mb-2">
                     {dropdownLinks.map((sub, si) => (
                        <a key={si} href={`#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-400 hover:text-white py-2 transition-colors">
                          {sub}
                        </a>
                     ))}
                   </div>
                 )}
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
