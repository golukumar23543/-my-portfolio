import { ArrowDown, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';

const RedditIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
    <path d="M17 12c.5 0 1-.5 1-1s-.5-1-1-1"/>
    <path d="M7 12c-.5 0-1-.5-1-1s.5-1 1-1"/>
  </svg>
);
import { motion } from 'motion/react';

export default function Hero() {
  const [profileImage, setProfileImage] = useState('/golu.jpg');

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.profile_image) {
          setProfileImage(data.profile_image);
        }
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <section id="home" className="relative w-full min-h-screen pt-32 pb-16 px-6 md:px-12 flex flex-col justify-center bg-grid">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 w-full">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-start"
        >
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Available for Projects & Mentoring</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold font-heading tracking-tight mb-4 text-white">
            Hi, My self <span className="text-accent-blue">Golu</span> <span className="text-accent-yellow">Prajapati</span>
          </h1>

          <h2 className="text-2xl lg:text-4xl font-bold text-accent-blue mb-6">
            CSE Diploma Student
          </h2>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            A passionate CSE Diploma student & developer from Patna, Bihar —
            combining modern technology with <span className="text-accent-yellow font-medium">passion and dedication</span> to
            build real-world solutions and empower students through practical
            learning.
          </p>

          <p className="text-gray-500 text-sm mb-10">NSIT (Netaji Subhas Institute of Technology) · Patna, Bihar</p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button onClick={() => alert("CV download will be available soon!")} className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-8 py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              Download CV
              <ArrowDown size={18} />
            </button>
            <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 rounded-full font-bold border border-white/20 text-white hover:bg-white/5 transition-all">
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/rahul-kumar-76a85a3bb?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
                { Icon: Youtube, href: 'https://www.youtube.com/channel/UCJIkkp_IbhdrIyPep92Mekw' },
                { Icon: Instagram, href: 'https://www.instagram.com/nexott.store?igsh=bXdsbjBieGlxejQz&utm_source=qr' },
                { Icon: RedditIcon, href: 'https://www.reddit.com/u/nexott_store/s/BpwFB8frF4' },
                { Icon: Twitter, href: 'https://x.com/nexottstore?s=21' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="text-gray-500 text-sm font-medium">Follow me</div>
          </div>
        </motion.div>

        {/* Right Image/Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none relative"
        >
          {/* Decorative outer rings */}
          <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 rounded-full ring-1 ring-accent-blue/30 shadow-[0_0_80px_rgba(34,211,238,0.15)] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full ring-1 ring-white/10" />
            <div className="absolute inset-8 rounded-full border-4 border-primary-dark overflow-hidden bg-secondary-dark z-10 flex items-center justify-center">
               <div className="text-6xl font-bold font-heading text-accent-yellow scale-[2] opacity-20 absolute z-0">G</div>
               <img 
                 src={profileImage} 
                 alt="Mr. Golu"
                 className="w-full h-full object-cover relative z-10"
               />
            </div>

            {/* Floating Badges */}
            <div className="absolute top-10 -left-6 z-20 bg-secondary-dark/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-black/50">
              <span>🎓</span> <span className="text-sm font-bold">Diploma CSE</span>
            </div>
            <div className="absolute bottom-1/4 -right-10 z-20 bg-secondary-dark/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-black/50">
              <span>💻</span> <span className="text-sm font-bold">Web Developer</span>
            </div>
            <div className="absolute bottom-4 left-4 z-20 bg-secondary-dark/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-black/50">
              <span>🚀</span> <span className="text-sm font-bold">NSIT</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
        <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </section>
  );
}
