import { Sun, MessageCircle, User } from 'lucide-react';

export default function Navbar({ toggleTheme, theme, onLoginClick, onAdminClick }: { toggleTheme?: () => void, theme?: string, onLoginClick?: () => void, onAdminClick?: () => void }) {
  const links = ['Home', 'About', 'Developer', 'Learning Hub', 'Services', 'Gallery', 'Contact'];

  return (
    <nav className="w-full fixed top-0 z-50 bg-primary-dark/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
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

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-6">
        {links.map((link, idx) => (
          <a key={idx} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
            {link}
            {['About', 'Developer', 'Learning Hub', 'Services'].includes(link) && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            )}
          </a>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Sun size={18} />
        </button>
        <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-green-400 hover:bg-green-400/10 transition-all">
          <MessageCircle size={18} />
        </a>
        <button onClick={onLoginClick} className="hidden sm:flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-semibold px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <User size={18} />
          Login
        </button>
      </div>
    </nav>
  );
}
