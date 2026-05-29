import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-gradient-to-b from-secondary-dark to-primary-dark border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-blue/20 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6 text-white relative z-10">
          Let's Build Something <span className="text-accent-blue">Great Tog</span><span className="text-accent-yellow">et</span><span className="text-white">her</span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">
          Whether it's a website, a mentoring session, or a full brand setup — I'm here to help.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href="#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] text-lg">
            Start a Project
            <ArrowRight size={20} />
          </a>
          
          <a href="https://wa.me/918709107808" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-yellow hover:bg-yellow-500 text-primary-dark font-bold px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] text-lg">
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
