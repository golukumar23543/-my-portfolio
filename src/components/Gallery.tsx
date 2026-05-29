import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';

export default function Gallery() {
  const [images, setImages] = useState<any[]>([
    { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&h=400', caption: 'Coding session' }
  ]);

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.gallery) {
          try {
            setImages(JSON.parse(data.gallery));
          } catch(e) {
            console.error('Failed to parse gallery JSON', e);
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Gallery</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          Visual <span className="text-accent-yellow">Journey</span>
        </h2>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer">
            <img src={img.url} alt={img.caption || 'Gallery Image'} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
            {img.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium">{img.caption}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
