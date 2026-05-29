import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const testimonials = [
    {
      name: 'Shivam Kumar',
      role: 'Tech Enthusiast',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150',
      text: 'Connected with Suraj mutual friends, and his technical has been really helpful. His approach is focused and clear.'
    },
    {
      name: 'Deepak Kumar',
      role: 'Electrical Engineer',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200',
      text: '"As a junior, I have learned a lot from Golu, especially in programming and development. His way of teaching with real examples makes concepts much easier to understand and apply."'
    },
    {
      name: 'Shubham Singh',
      role: 'Tech Enthusiast',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150',
      text: 'I have worked closely with him as a classmate. His technical guidance has always been practical and helpful.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getIndex = (offset: number) => {
    const index = (activeIndex + offset) % testimonials.length;
    return index < 0 ? testimonials.length - 1 : index;
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Testimonials</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          What People <span className="text-accent-blue">Sa</span><span className="text-accent-yellow">y</span>
        </h2>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>

      <div className="flex items-center justify-center gap-6 opacity-30 md:opacity-100">
        
        {/* Previous */}
        <div className="hidden md:block w-1/4 transform scale-90 opacity-40 translate-x-12 blur-[1px] transition-all duration-700">
          <TestimonialCard t={testimonials[getIndex(-1)]} />
        </div>

        {/* Active Grid/Carousel Center */}
        <div className="w-full md:w-2/5 relative z-10 transition-all duration-700">
          <TestimonialCard t={testimonials[activeIndex]} active />
        </div>

        {/* Next */}
        <div className="hidden md:block w-1/4 transform scale-90 opacity-40 -translate-x-12 blur-[1px] transition-all duration-700">
          <TestimonialCard t={testimonials[getIndex(1)]} />
        </div>

      </div>

      {/* Feedback Form Dashboard */}
      <div className="mt-24 max-w-3xl mx-auto bg-secondary-dark border border-white/10 rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white mb-2">Leave Your Feedback</h3>
          <p className="text-gray-400 text-sm">Have something to say? Share your thoughts with me!</p>
        </div>

        <form className="relative z-10 space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            feedback: (form.elements.namedItem('feedback') as HTMLTextAreaElement).value
          };
          try {
            const res = await fetch('/api/feedback', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
            if (res.ok) {
              alert('Thank you for your feedback! It has been submitted directly to Mr. Golu.');
              form.reset();
            } else {
              alert('Failed to submit feedback.');
            }
          } catch(err) {
            alert('An error occurred.');
          }
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Your Name</label>
              <input 
                name="name"
                required
                type="text" 
                placeholder="John Doe"
                className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address (Optional)</label>
              <input 
                name="email"
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Your Feedback</label>
            <textarea 
              name="feedback"
              required
              rows={4}
              placeholder="What do you think about my work?"
              className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all resize-none"
            />
          </div>
          <button type="submit" className="w-full bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}

function TestimonialCard({ t, active = false }: { t: any, active?: boolean }) {
  return (
    <div className={`bg-secondary-dark rounded-3xl p-8 lg:p-10 border transition-all duration-500 relative flex flex-col items-center text-center 
      ${active ? 'border-accent-blue/30 shadow-[0_0_40px_rgba(56,189,248,0.1)]' : 'border-white/5'}
    `}>
      <div className={`absolute top-6 left-6 text-6xl font-serif text-accent-blue/20 leading-none`}>"</div>
      
      <p className={`text-gray-400 italic leading-relaxed mb-8 relative z-10 ${active ? 'text-base lg:text-lg' : 'text-sm'}`}>
        {t.text}
      </p>

      <div className="flex gap-1 mb-6 text-accent-yellow">
        {[...Array(5)].map((_, i) => <Star key={i} size={active ? 16 : 14} fill="currentColor" strokeWidth={0} />)}
      </div>

      <div className={`rounded-full p-1 mb-4 ${active ? 'bg-gradient-to-r from-accent-blue to-blue-500' : 'bg-white/10'}`}>
        <img src={t.image} alt={t.name} className={`rounded-full object-cover border-2 border-primary-dark ${active ? 'w-20 h-20' : 'w-16 h-16'}`} />
      </div>

      <h4 className={`font-bold text-white mb-1 ${active ? 'text-lg' : 'text-base'}`}>{t.name}</h4>
      <p className={`text-gray-500 ${active ? 'text-sm' : 'text-xs'}`}>{t.role}</p>

      <div className="absolute font-serif text-accent-blue/20 rotate-180 -bottom-2 right-6 min-h-6 min-w-6 text-6xl">"</div>
    </div>
  );
}
