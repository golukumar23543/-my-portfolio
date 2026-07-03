import { Star, Upload, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { addFeedback, getFeedbacks } from '../lib/api';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [testimonials, setTestimonials] = useState<any[]>([
    {
      name: 'Shivam Kumar',
      role: 'Tech Enthusiast',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150',
      text: 'Connected with Suraj mutual friends, and his technical has been really helpful. His approach is focused and clear.',
      rating: 5
    },
    {
      name: 'Deepak Kumar',
      role: 'Electrical Engineer',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&h=200',
      text: '"As a junior, I have learned a lot from Golu, especially in programming and development. His way of teaching with real examples makes concepts much easier to understand and apply."',
      rating: 5
    },
    {
      name: 'Shubham Singh',
      role: 'Tech Enthusiast',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150',
      text: 'I have worked closely with him as a classmate. His technical guidance has always been practical and helpful.',
      rating: 4
    }
  ]);

  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState<string | null>(null);

  useEffect(() => {
    // Fetch real feedbacks and append/replace defaults
    getFeedbacks().then(data => {
      if (data && data.length > 0) {
        setTestimonials(prev => {
          // Prepend new feedbacks to the default ones
          const formatted = data.map((d: any) => ({
            name: d.name,
            role: d.branch || 'Student',
            image: d.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&h=150',
            text: d.feedback,
            rating: d.rating || 5
          }));
          return [...formatted, ...prev];
        });
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getIndex = (offset: number) => {
    if (testimonials.length === 0) return 0;
    const index = (activeIndex + offset) % testimonials.length;
    return index < 0 ? testimonials.length - 1 : index;
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX = 200;
          if (width > height && width > MAX) { height *= MAX / width; width = MAX; }
          else if (height > MAX) { width *= MAX / height; height = MAX; }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          setImageFile(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.src = evt.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="people-say" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
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

      {testimonials.length > 0 && (
        <div className="relative flex items-stretch justify-center gap-6 opacity-30 md:opacity-100 min-h-[400px]">
          
          <button onClick={() => setActiveIndex(getIndex(-1))} className="absolute left-0 md:left-10 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-secondary-dark/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors shadow-xl top-1/2 -translate-y-1/2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Previous */}
          {testimonials.length > 2 && (
            <div className="hidden md:block w-1/4 transform scale-90 opacity-40 translate-x-12 blur-[1px] transition-all duration-700 flex-1">
              <TestimonialCard t={testimonials[getIndex(-1)]} />
            </div>
          )}

          {/* Active Grid/Carousel Center */}
          <div className="w-full md:w-2/5 relative z-10 transition-all duration-700 flex-1">
            <TestimonialCard t={testimonials[activeIndex] || testimonials[0]} active />
          </div>

          {/* Next */}
          {testimonials.length > 1 && (
            <div className="hidden md:block w-1/4 transform scale-90 opacity-40 -translate-x-12 blur-[1px] transition-all duration-700 flex-1">
              <TestimonialCard t={testimonials[getIndex(1)]} />
            </div>
          )}

          <button onClick={() => setActiveIndex(getIndex(1))} className="absolute right-0 md:right-10 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-secondary-dark/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors shadow-xl top-1/2 -translate-y-1/2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

        </div>
      )}

      {/* Feedback Form Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-32 max-w-5xl mx-auto relative group"
      >
        {/* Animated Background Gradients Behind Form */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 via-primary-dark to-accent-yellow/10 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="relative bg-[#0a0d14]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Glass reflection top edge */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="flex flex-col lg:flex-row">
            {/* Left Panel: Context & Styling */}
            <div className="w-full lg:w-[42%] p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent flex flex-col justify-between relative overflow-hidden">
              {/* Blur blobs inside left panel */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent-blue/30 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="absolute -bottom-32 -right-24 w-72 h-72 bg-accent-yellow/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-8 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <Star size={28} className="fill-accent-blue/20" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-extrabold font-heading text-white mb-5 tracking-tight leading-tight">
                  Your Thoughts <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-yellow">Matter.</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-10">
                  Have something to say? Whether it's about my coding style, a project we worked on, or just a quick hello — I'd love to hear from you.
                </p>
                
                <div className="space-y-5">
                   <div className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-yellow"><Star size={16} fill="currentColor" /></div>
                      Leave a public review
                   </div>
                   <div className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-green-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                      Constructive feedback
                   </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="mt-16 opacity-30 mix-blend-overlay relative z-10 hidden lg:block">
                <div className="text-[100px] font-heading font-black text-white/10 leading-none absolute -bottom-16 -left-8 tracking-tighter select-none">Feedback</div>
              </div>
            </div>

            {/* Right Panel: Form */}
            <div className="w-full lg:w-[58%] p-10 lg:p-14 relative z-10 bg-primary-dark/30">
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = {
                  name: (form.elements.namedItem('name') as HTMLInputElement).value,
                  email: (form.elements.namedItem('email') as HTMLInputElement).value,
                  branch: (form.elements.namedItem('branch') as HTMLSelectElement).value,
                  feedback: (form.elements.namedItem('feedback') as HTMLTextAreaElement).value,
                  rating: rating,
                  image: imageFile
                };
                try {
                  const res = await addFeedback(data);
                  if (res.success) {
                    alert('Thank you for your feedback! It has been submitted directly to Mr. Golu.');
                    setTestimonials(prev => [{
                       name: data.name,
                       role: data.branch || 'Student',
                       image: data.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=150&h=150',
                       text: data.feedback,
                       rating: data.rating
                    }, ...prev]);
                    form.reset();
                    setRating(5);
                    setImageFile(null);
                  } else {
                    alert('Failed to submit feedback.');
                  }
                } catch(err) {
                  alert('An error occurred.');
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Name</label>
                    <input 
                      name="name"
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-blue focus:bg-white/[0.03] transition-all"
                    />
                  </div>
                  
                  {/* Branch select */}
                  <div className="space-y-1.5 flex-1 relative">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Designation</label>
                    <select name="branch" required defaultValue="" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:outline-none focus:border-accent-blue focus:bg-white/[0.03] transition-all cursor-pointer [&>option]:bg-primary-dark">
                      <option value="" disabled className="text-gray-600">Select Role</option>
                      <option value="CSE Student">CSE Student</option>
                      <option value="Civil Student">Civil Student</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Colleague">Colleague / Peer</option>
                      <option value="Client">Client</option>
                    </select>
                    <Building2 size={16} className="absolute right-4 bottom-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1 flex justify-between">
                    <span>Email</span>
                    <span className="text-gray-600 font-normal normal-case tracking-normal">Private</span>
                  </label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-blue focus:bg-white/[0.03] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Feedback</label>
                  <textarea 
                    name="feedback"
                    required
                    rows={4}
                    placeholder="What do you think about my work? Be honest!"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-blue focus:bg-white/[0.03] transition-all resize-none block"
                  />
                </div>

                {/* Rating & Photo Upload row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-4 border-t border-white/10">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Rating</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-1.5 rounded-lg transition-all active:scale-95 ${rating >= star ? 'text-accent-yellow bg-accent-yellow/10' : 'text-gray-600 hover:text-gray-400 hover:bg-white/5'}`}
                        >
                          <Star size={22} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={rating >= star ? 0 : 2} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Photo (Optional)</label>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-black/40 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                        {imageFile ? <img src={imageFile} alt="Preview" className="w-full h-full object-cover" /> : <Upload size={16} className="text-gray-500" />}
                      </div>
                      <button type="button" onClick={() => document.getElementById('fb-img')?.click()} className="text-xs font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg border border-white/10 transition-colors active:scale-95">
                        Choose
                      </button>
                      <input type="file" id="fb-img" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="w-full mt-2 bg-gradient-to-r from-accent-blue/90 to-blue-500/90 hover:from-accent-blue hover:to-blue-400 text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] flex justify-center items-center gap-2 active:scale-95">
                  Submit Feedback
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TestimonialCard({ t, active = false }: { t: any, active?: boolean }) {
  if (!t) return null;
  return (
    <div className={`bg-secondary-dark rounded-3xl p-8 lg:p-10 border transition-all duration-500 relative flex flex-col items-center text-center h-full justify-between w-full
      ${active ? 'border-accent-blue/30 shadow-[0_0_40px_rgba(56,189,248,0.1)]' : 'border-white/5'}
    `}>
      <div className={`absolute top-6 left-6 text-6xl font-serif text-accent-blue/20 leading-none`}>"</div>
      
      <div className="flex-1 w-full flex items-center justify-center mb-8 relative z-10 pt-4">
        <p className={`text-gray-300 italic leading-relaxed w-full max-h-[160px] overflow-y-auto break-words break-all whitespace-pre-wrap pr-2 custom-scrollbar ${active ? 'text-base lg:text-lg' : 'text-sm'}`}>
          {t.text}
        </p>
      </div>

      <div className="flex gap-1 mb-6 text-accent-yellow shrink-0">
        {[...Array(5)].map((_, i) => <Star key={i} size={active ? 16 : 14} fill={i < (t.rating || 5) ? "currentColor" : "none"} strokeWidth={i < (t.rating || 5) ? 0 : 1} stroke={i < (t.rating || 5) ? "none" : "#6b7280"} />)}
      </div>

      <div className={`rounded-full p-1 mb-4 shrink-0 ${active ? 'bg-gradient-to-r from-accent-blue to-accent-yellow' : 'bg-white/10'}`}>
        <img src={t.image} alt={t.name} className={`rounded-full object-cover border-2 border-primary-dark ${active ? 'w-20 h-20' : 'w-16 h-16'}`} />
      </div>

      <div className="shrink-0 w-full">
        <h4 className={`font-bold text-white mb-1 truncate ${active ? 'text-lg' : 'text-base'}`}>{t.name}</h4>
        <p className={`text-accent-blue/80 font-medium truncate ${active ? 'text-sm' : 'text-xs'}`}>{t.role}</p>
      </div>

      <div className="absolute font-serif text-accent-blue/20 rotate-180 -bottom-2 right-6 min-h-6 min-w-6 text-6xl pointer-events-none">"</div>
    </div>
  );
}
