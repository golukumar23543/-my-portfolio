import { Star, Upload, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
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
        <div className="relative flex items-center justify-center gap-6 opacity-30 md:opacity-100 min-h-[300px]">
          
          <button onClick={() => setActiveIndex(getIndex(-1))} className="absolute left-0 md:left-10 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-secondary-dark/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors shadow-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Previous */}
          {testimonials.length > 2 && (
            <div className="hidden md:block w-1/4 transform scale-90 opacity-40 translate-x-12 blur-[1px] transition-all duration-700">
              <TestimonialCard t={testimonials[getIndex(-1)]} />
            </div>
          )}

          {/* Active Grid/Carousel Center */}
          <div className="w-full md:w-2/5 relative z-10 transition-all duration-700">
            <TestimonialCard t={testimonials[activeIndex] || testimonials[0]} active />
          </div>

          {/* Next */}
          {testimonials.length > 1 && (
            <div className="hidden md:block w-1/4 transform scale-90 opacity-40 -translate-x-12 blur-[1px] transition-all duration-700">
              <TestimonialCard t={testimonials[getIndex(1)]} />
            </div>
          )}

          <button onClick={() => setActiveIndex(getIndex(1))} className="absolute right-0 md:right-10 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-secondary-dark/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors shadow-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

        </div>
      )}

      {/* Feedback Form Dashboard */}
      <div className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-secondary-dark/80 to-primary-dark border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-yellow/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-10 relative z-10">
          <h3 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-3 tracking-tight">Leave Your Feedback</h3>
          <p className="text-gray-400 text-base max-w-xl mx-auto">Have something to say? Share your thoughts, rate my work, and help me improve!</p>
        </div>

        <form className="relative z-10 space-y-8" onSubmit={async (e) => {
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
          
          <div className="bg-primary-dark/50 border border-white/5 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                 {/* Rating */}
                 <div className="space-y-3">
                   <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">Rate your experience</label>
                   <div className="flex gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <button
                         type="button"
                         key={star}
                         onClick={() => setRating(star)}
                         className={`p-2 rounded-full transition-all hover:scale-110 ${rating >= star ? 'text-accent-yellow bg-accent-yellow/10' : 'text-gray-600 bg-white/5'}`}
                       >
                         <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} strokeWidth={rating >= star ? 0 : 2} />
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Profile Image Select */}
                 <div className="space-y-3">
                   <label className="text-sm font-semibold text-gray-300">Profile Image</label>
                   <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-full bg-secondary-dark border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                        {imageFile ? <img src={imageFile} alt="Preview" className="w-full h-full object-cover" /> : <Upload size={20} className="text-gray-500" />}
                     </div>
                     <button type="button" onClick={() => document.getElementById('fb-img')?.click()} className="text-sm font-medium bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/10 transition-colors">
                       Upload Photo
                     </button>
                     <input type="file" id="fb-img" accept="image/*" className="hidden" onChange={handleImageChange} />
                   </div>
                 </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Your Name</label>
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium text-gray-300">Branch / Designation</label>
                    <div className="relative">
                      <select name="branch" required className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all cursor-pointer">
                        <option value="">Select Branch</option>
                        <option value="CSE Student">CSE</option>
                        <option value="Civil Student">Civil</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Colleague">Colleague / Peer</option>
                        <option value="Client">Client</option>
                      </select>
                      <Building2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium text-gray-300 border-t border-white/5 pt-6 block flex justify-between">
                <span>Email Address (Optional)</span>
              </label>
              <input 
                name="email"
                type="email" 
                placeholder="john@example.com (kept private)"
                className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              />
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium text-gray-300">Your Feedback</label>
              <textarea 
                name="feedback"
                required
                rows={4}
                placeholder="What do you think about my work? Be honest!"
                className="w-full bg-secondary-dark/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all resize-none shadow-inner"
              />
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-accent-blue to-blue-500 hover:from-accent-blue-hover hover:to-blue-400 text-primary-dark font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] flex justify-center items-center gap-2">
              Submit Review
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function TestimonialCard({ t, active = false }: { t: any, active?: boolean }) {
  if (!t) return null;
  return (
    <div className={`bg-secondary-dark rounded-3xl p-8 lg:p-10 border transition-all duration-500 relative flex flex-col items-center text-center 
      ${active ? 'border-accent-blue/30 shadow-[0_0_40px_rgba(56,189,248,0.1)]' : 'border-white/5'}
    `}>
      <div className={`absolute top-6 left-6 text-6xl font-serif text-accent-blue/20 leading-none`}>"</div>
      
      <p className={`text-gray-300 italic leading-relaxed mb-8 relative z-10 ${active ? 'text-base lg:text-lg' : 'text-sm'}`}>
        {t.text}
      </p>

      <div className="flex gap-1 mb-6 text-accent-yellow">
        {[...Array(5)].map((_, i) => <Star key={i} size={active ? 16 : 14} fill={i < (t.rating || 5) ? "currentColor" : "none"} strokeWidth={i < (t.rating || 5) ? 0 : 1} stroke={i < (t.rating || 5) ? "none" : "#6b7280"} />)}
      </div>

      <div className={`rounded-full p-1 mb-4 ${active ? 'bg-gradient-to-r from-accent-blue to-accent-yellow' : 'bg-white/10'}`}>
        <img src={t.image} alt={t.name} className={`rounded-full object-cover border-2 border-primary-dark ${active ? 'w-20 h-20' : 'w-16 h-16'}`} />
      </div>

      <h4 className={`font-bold text-white mb-1 ${active ? 'text-lg' : 'text-base'}`}>{t.name}</h4>
      <p className={`text-accent-blue/80 font-medium ${active ? 'text-sm' : 'text-xs'}`}>{t.role}</p>

      <div className="absolute font-serif text-accent-blue/20 rotate-180 -bottom-2 right-6 min-h-6 min-w-6 text-6xl">"</div>
    </div>
  );
}
