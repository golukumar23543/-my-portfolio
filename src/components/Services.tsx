import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';

export default function Services() {
  const [services, setServices] = useState<any[]>([
    { 
      title: 'Full-Stack Development', 
      desc: 'End-to-end custom web applications with React, Next.js, and modern backend architectures.', 
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $999', 
      link: '#' 
    },
    { 
      title: 'UI/UX Design', 
      desc: 'Pixel-perfect, user-centric interfaces designed in Figma to maximize engagement.', 
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $499', 
      link: '#' 
    },
    { 
      title: 'Mobile App Development', 
      desc: 'Cross-platform mobile applications for iOS and Android using React Native.', 
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $1499', 
      link: '#' 
    },
    { 
      title: 'Backend & Cloud DevOps', 
      desc: 'Scalable infrastructure, serverless deployments, and database architecture on AWS/Firebase.', 
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&h=400', 
      price: 'Starts at $799', 
      link: '#' 
    },
    {
      title: 'AI & Machine Learning Int.',
      desc: 'Implement OpenAI, Gemini, or custom LLMs directly into your applications to build intelligent features.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $1199',
      link: '#'
    },
    {
      title: 'E-Commerce Solutions',
      desc: 'High-conversion online stores with custom payment gateways, inventory management, and marketing tools.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $899',
      link: '#'
    },
    {
      title: 'Technical Consulting',
      desc: 'Expert guidance on software architecture, technology stack selection, and cloud migration strategies.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $249',
      link: '#'
    },
    {
      title: 'Custom CMS Solutions',
      desc: 'Headless CMS implementations using Sanity or Strapi tailored for your marketing team\'s workflow.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $699',
      link: '#'
    },
    {
      title: 'MVP Prototyping',
      desc: 'Rapid development of Minimum Viable Products for startups to test ideas and secure funding quickly.',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&h=400',
      price: 'Starts at $1999',
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
