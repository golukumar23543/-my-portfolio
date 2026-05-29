import { ArrowRight, MessageCircle, Linkedin, Youtube, Instagram, Twitter, Heart } from 'lucide-react';

const RedditIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
    <path d="M17 12c.5 0 1-.5 1-1s-.5-1-1-1"/>
    <path d="M7 12c-.5 0-1-.5-1-1s.5-1 1-1"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-secondary-dark/50 border-t border-white/5 pt-16 mt-12 pb-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-2 text-white">
            Ready to Build Something <span className="text-accent-blue">Extraordinar</span><span className="text-accent-yellow">y?</span>
          </h2>
          <p className="text-gray-400">Let's collaborate. I'm available for projects, mentoring, and more.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-6 py-3 rounded-full transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <MessageCircle size={18} />
            WhatsApp Me
          </a>
          <a href="mailto:ambitiongolu@gmail.com" className="flex items-center gap-2 bg-transparent hover:bg-white/5 text-accent-blue border border-white/20 px-6 py-3 rounded-full transition-all">
            Contact Form
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center font-bold text-lg italic pr-0.5">G</div>
             <span className="font-heading font-bold text-xl">Mr. Golu</span>
          </div>
          <p className="text-accent-blue font-medium italic text-sm">
            "Building Technology with Discipline & Purpose"
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            Software Developer · Diploma in CSE from NSIT (Netaji Subhas Institute of Technology).
          </p>
          <div className="space-y-3 mt-2">
            <a href="mailto:ambitiongolu@gmail.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>
              ambitiongolu@gmail.com
            </a>
            <a href="tel:+918709107808" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +91 8709107808
            </a>
            <p className="flex items-center gap-3 text-sm text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Patna, Bihar, India
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            {[
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/rahul-kumar-76a85a3bb?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
              { Icon: Youtube, href: 'https://www.youtube.com/channel/UCJIkkp_IbhdrIyPep92Mekw' },
              { Icon: Instagram, href: 'https://www.instagram.com/nexott.store?igsh=bXdsbjBieGlxejQz&utm_source=qr' },
              { Icon: RedditIcon, href: 'https://www.reddit.com/u/nexott_store/s/BpwFB8frF4' },
              { Icon: Twitter, href: 'https://x.com/nexottstore?s=21' },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex gap-2 items-center">
            Quick Links
            <div className="h-px bg-accent-blue/50 flex-1"></div>
          </h4>
          <ul className="space-y-4">
            {['About Me', 'Projects', 'Learning Hub', 'Gallery', 'Services', 'Contact'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-accent-blue text-sm transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex gap-2 items-center">
            Services
            <div className="h-px bg-accent-blue/50 flex-1"></div>
          </h4>
          <ul className="space-y-4">
            {['Website Development', 'Branding & Logo Design', 'Graphic Design', 'Software Solutions', 'Social Media Setup', 'Video Editing', 'Wedding Album'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-accent-blue text-sm transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Connect */}
        <div>
          <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm flex gap-2 items-center">
            Connect With Me
            <div className="h-px bg-accent-blue/50 flex-1"></div>
          </h4>
          <div className="space-y-4 text-sm text-gray-400">
            <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
            <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-accent-blue transition-colors mt-4 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10">
              <MessageCircle size={18} className="text-accent-blue" />
              WhatsApp Message
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© 2026 <span className="text-accent-blue hover:underline cursor-pointer">Mr. Golu</span> . All rights reserved.</p>
        
        <div className="flex items-center gap-2 border border-white/10 bg-black/20 rounded-full px-4 py-1.5 border-dashed">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          1,200 total page views
        </div>

        <p className="flex items-center gap-1">
          Made with <Heart size={12} className="text-red-500" /> in Patna, Bihar, India
        </p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
