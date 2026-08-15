import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';
import { motion } from 'motion/react';
import { BookOpen, ExternalLink, Play } from 'lucide-react';

export default function LearningHubPage() {
  const [learningResources, setLearningResources] = useState<any[]>([]);

  useEffect(() => {
    getSettings().then(data => {
      if (data.learning_hub) {
        try {
          setLearningResources(JSON.parse(data.learning_hub));
        } catch(e) {}
      } else {
        // defaults if empty
        setLearningResources([
          { title: "HTML & CSS Crash Course", type: "Video", link: "#", desc: "Master the basics of web design." },
          { title: "JavaScript Fundamentals", type: "Article", link: "#", desc: "Deep dive into JS concepts." }
        ]);
      }
    });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white">
          Learning Hub
        </h1>
        <p className="text-gray-400 text-lg">Tutorials, articles, and resources curated by Mr. Golu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningResources.map((res, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-secondary-dark border border-white/5 p-6 rounded-2xl hover:border-accent-blue transition-colors group"
          >
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-accent-blue group-hover:bg-accent-blue/10">
              {res.type === 'Video' ? <Play size={24} /> : <BookOpen size={24} />}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{res.title}</h3>
            <p className="text-gray-400 text-sm mb-6">{res.desc}</p>
            <a href={res.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-accent-blue hover:text-white transition-colors">
              Access Resource <ExternalLink size={16} />
            </a>
          </motion.div>
        ))}
      </div>
      
      {learningResources.length === 0 && (
        <div className="text-center text-gray-500 py-12 border border-white/5 rounded-2xl">
          No resources available yet. Admin can add resources from the Admin Panel.
        </div>
      )}
    </div>
  );
}
