import { useState, useEffect } from 'react';

export default function Services() {
  const [services, setServices] = useState<any[]>([
    { title: 'Website Dev', desc: 'Full-stack custom websites', image: '', price: 'Contact', link: '#' },
    { title: 'Digital Growth', desc: 'Zero to growth strategy', image: '', price: 'Contact', link: '#' },
  ]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
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
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Services & Products</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          What I <span className="text-accent-blue">Off</span><span className="text-accent-yellow">er</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-xl">
          From websites to full brand identity — premium digital services crafted with precision.
        </p>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => {
          return (
            <a href={s.link || "#"} key={i} className="bg-secondary-dark border border-white/5 hover:border-accent-blue/30 transition-all rounded-2xl flex flex-col group overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] block">
              <div className="h-48 w-full bg-primary-dark overflow-hidden flex items-center justify-center">
                {s.image ? (
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <span className="text-gray-600 font-medium">No Image Provided</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent-blue transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1">{s.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-accent-yellow font-bold text-sm tracking-wide">{s.price || 'Contact for Price'}</span>
                   <span className="text-accent-blue text-xs font-bold uppercase tracking-wider">View Details</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
