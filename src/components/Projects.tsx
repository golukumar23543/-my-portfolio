import { Code, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([
    {
      title: 'E-Learning Platform',
      type: 'WEB',
      description: 'AryaPathshala is an educational platform designed to provide a smooth and engaging learning experience. Built with modern technologies, it focuses on simplicity, performance, and helping learners grow effectively.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'Weather Calculator Pro',
      type: 'FRONTEND',
      description: 'Advanced weather calculation project. Features real-time weather forecasting with OpenWeather API integration and climate metric analytics in a visually appealing UI.',
      tags: ['React', 'API', 'Data Viz'],
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'TaskMaster Pro',
      type: 'FULLSTACK',
      description: 'A comprehensive task management solution with real-time collaboration, drag-and-drop kanban boards, and detailed productivity tracking.',
      tags: ['TypeScript', 'Firebase', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'EcoStore E-Commerce',
      type: 'WEB',
      description: 'A fully functional modern e-commerce platform focusing on eco-friendly products, complete with a custom shopping cart and payment integration.',
      tags: ['Next.js', 'Stripe', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'Crypto Tracker AI',
      type: 'WEB',
      description: 'An AI-powered cryptocurrency dashboard providing real-time market trends, personalized portfolio analysis, and pattern predictions.',
      tags: ['Vue.js', 'Firebase', 'Data Viz'],
      image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'Fitness Buddy App',
      type: 'MOBILE',
      description: 'A comprehensive mobile application focusing on personal fitness journeys, offering customizable workout plans and nutrition tracking.',
      tags: ['React Native', 'GraphQL', 'AWS'],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=800',
    }
  ]);
  const [customHtml, setCustomHtml] = useState<string>('');

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.featured_html && data.featured_html.trim() !== '') {
           setCustomHtml(data.featured_html);
        } else if (data.featured_work) {
          try {
            const parsed = JSON.parse(data.featured_work);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setProjects(parsed);
            }
          } catch(e) {
            console.error('Failed to parse featured_work JSON', e);
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Projects</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          Featured <span className="text-accent-yellow">Work</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Real projects solving real problems — from e-learning platforms to API-powered apps.
        </p>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>

      {customHtml ? (
        <div 
          className="custom-featured-work-container"
          dangerouslySetInnerHTML={{ __html: customHtml }} 
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-secondary-dark rounded-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row hover:border-white/10 transition-colors">
                {/* Left Info */}
                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold tracking-wider text-accent-blue border border-accent-blue/30 px-3 py-1 rounded-full bg-accent-blue/5">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags?.map((tag: string) => (
                      <span key={tag} className="text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a href={project.codeLink || '#'} onClick={(e) => !project.codeLink && e.preventDefault()} target={project.codeLink ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                      <Code size={16} />
                      Code
                    </a>
                    <a href={project.liveLink || '#'} onClick={(e) => !project.liveLink && e.preventDefault()} target={project.liveLink ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark px-5 py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-colors">
                      <ExternalLink size={16} />
                      Live Site
                    </a>
                  </div>
                </div>
                {/* Right Image Placeholder */}
                <div className="w-full md:w-2/5 h-64 md:h-auto border-l border-white/5">
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <a href="https://github.com/nexott_store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-8 py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </>
      )}
    </section>
  );
}
