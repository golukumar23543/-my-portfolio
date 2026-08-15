import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSettings } from '../lib/api';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';

export default function ServicePage() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.services) {
          try {
            const parsed = JSON.parse(data.services);
            // find the service whose slug matches
            const found = parsed.find((s: any) => s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
            setService(found);
          } catch(e) {}
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-24"><div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-400 mb-8">The service you are looking for does not exist or has been removed.</p>
        <Link to="/#services" className="px-6 py-3 bg-accent-blue text-primary-dark font-bold rounded-full">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
      <Link to="/#services" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} />
        Back to Services
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {service.image && (
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl relative border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent z-10"></div>
            <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">Service Overview</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">{service.title}</h1>
            <p className="text-xl text-accent-yellow font-bold">{service.price}</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            {service.liveLink && (
              <a href={service.liveLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-accent-blue text-primary-dark font-bold rounded-xl shadow-lg hover:bg-accent-blue-hover transition-colors text-center inline-flex items-center justify-center gap-2">
                Live Preview <ExternalLink size={16} />
              </a>
            )}
            {service.link && (
              <a href={service.link} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-center">
                Download Resource
              </a>
            )}
            <a href={`https://wa.me/918709107808?text=Hi, I am interested in your service: ${service.title}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-center mt-2">
              Inquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-accent-blue hover:prose-a:text-accent-blue-hover prose-img:rounded-xl">
          {service.content ? (
            <div className="markdown-body bg-white/5 p-8 sm:p-12 rounded-3xl border border-white/5 shadow-inner">
              <Markdown>{service.content}</Markdown>
            </div>
          ) : (
            <p className="text-gray-400 text-xl leading-relaxed">{service.desc}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
