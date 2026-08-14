import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';
import ProductFeedbackModal from './ProductFeedbackModal';
import { MessageSquare } from 'lucide-react';

export default function Services() {
  const [activeFeedbackProduct, setActiveFeedbackProduct] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([
    { 
      title: 'Website Development', 
      desc: 'End-to-end custom web applications with React, Next.js, and modern backend architectures.', 
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $999', 
      link: '#' 
    },
    { 
      title: 'Branding & Logo Design', 
      desc: 'Crafting unique brand identities and memorable logos tailored to your business vision.', 
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $299', 
      link: '#' 
    },
    { 
      title: 'Graphic Design', 
      desc: 'High-quality visual content including flyers, banners, and digital marketing materials.', 
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $199', 
      link: '#' 
    },
    { 
      title: 'Software Solutions', 
      desc: 'Custom software architecture and solutions to optimize your business operations.', 
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $1499', 
      link: '#' 
    },
    {
      title: 'Social Media Setup',
      desc: 'Comprehensive setup and optimization for your business pages across major social platforms.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $399',
      link: '#'
    },
    {
      title: 'Video Editing',
      desc: 'Professional video editing services for YouTube, reels, and promotional business videos.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $499',
      link: '#'
    },
    {
      title: 'Wedding Album',
      desc: 'Beautifully designed and curated wedding albums to capture your special moments.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $249',
      link: '#'
    }
  ]);

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.services) {
          try {
            setServices(JSON.parse(data.services));
          } catch(e) {
            console.error('Failed to parse services JSON', e);
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Services & Products</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          <span className="text-accent-blue">Prod</span><span className="text-accent-yellow">uct</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl">
          From websites to full brand identity — premium digital services crafted with precision.
        </p>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          const serviceId = `service-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return (
            <div id={serviceId} key={i} className="bg-secondary-dark border border-white/5 hover:border-accent-blue/30 transition-all rounded-2xl flex flex-col overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
              <div className="h-48 w-full bg-primary-dark overflow-hidden flex items-center justify-center group">
                {s.image ? (
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <span className="text-gray-600 font-medium">No Image Provided</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{s.title}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${s.price === 'Free' ? 'bg-green-500/20 text-green-400' : 'bg-accent-yellow/20 text-accent-yellow'}`}>
                    {s.price || 'Contact for Price'}
                  </span>
                </div>
                {s.desc && <p className="text-gray-400 text-sm mb-6 flex-1">{s.desc}</p>}
                
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                   <button onClick={() => setActiveFeedbackProduct(s.title)} className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-lg border border-white/10 transition-colors" title="Leave Feedback">
                     <MessageSquare size={16} />
                   </button>
                   {s.link && (
                     <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 text-center py-2.5 rounded-lg text-sm font-semibold text-white transition-colors border border-white/10">
                       Download
                     </a>
                   )}
                   {s.liveLink && (
                     <a href={s.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark text-center py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-colors">
                       Live Preview
                     </a>
                   )}
                   {!s.link && !s.liveLink && (
                     <span className="text-gray-500 text-sm w-full text-center py-2">No links available</span>
                   )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
      {activeFeedbackProduct && <ProductFeedbackModal productTitle={activeFeedbackProduct} onClose={() => setActiveFeedbackProduct(null)} />}
    </>
  );
}
