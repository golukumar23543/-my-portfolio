import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';

export default function Mentoring() {
  const [categories, setCategories] = useState<any[]>([
    {
      title: 'Tech Mentor',
      desc: 'Web Dev, Programming & Computer Science fundamentals for 150+ students.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&h=500',
    },
    {
      title: 'Yoga & Wellness Guide',
      desc: 'National-level yoga practitioner sharing discipline and mindfulness.',
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&h=500',
    },
    {
      title: 'Spiritual Mentor',
      desc: 'Vedic wisdom and spiritual growth guidance from 7 years of Gurukul training.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&h=500',
    }
  ]);

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.mentoring) {
          try {
            setCategories(JSON.parse(data.mentoring));
          } catch(e) {
            console.error('Failed to parse mentoring JSON', e);
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="learning-hub" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Teaching & Mentoring</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          I Teach. I Guide. I <span className="text-accent-blue">Inspire</span><span className="text-accent-yellow">.</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Beyond code — mentoring in technology, yoga, and spiritual growth with 150+ students impacted.
        </p>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((c, i) => (
          <div key={i} className="bg-secondary-dark border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
            <div className="h-48 overflow-hidden m-4 rounded-xl border border-white/5">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
            </div>
            <div className="p-6 text-center pt-2">
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <a href="#contact" className="flex items-center gap-3 bg-secondary-dark border border-accent-blue/30 hover:border-accent-blue/60 text-accent-blue font-semibold px-8 py-3.5 rounded-full transition-all">
          Explore Learning Hub
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
}
