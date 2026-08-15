import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';

export default function AboutMe() {
  const [aboutData, setAboutData] = useState<any>({
    title: 'About Mr. Golu Prajapati',
    description: `Hello! My name is Mr. Golu Prajapati, and I am currently a Diploma student in Computer Science Engineering (CSE). I have a strong passion for learning and exploring the world of technology. I am constantly building my foundations and trying out new development tools to solve everyday problems.

Currently, I have basic knowledge of programming and web technologies, including HTML, CSS, JavaScript, Java, C language, Python, and DSA (Data Structures & Algorithms). I enjoy creating user-friendly interfaces and writing clean code. 

Beyond tech, I am fluent in Bhojpuri, Hindi, and English, allowing me to connect with people from different diverse backgrounds. Feel free to connect with me!

Contact No: +91 8709107808`,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Golu', // Updated to a working placeholder avatar
    skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'C Language', 'Python', 'DSA Basics']
  });

  useEffect(() => {
    getSettings()
      .then(data => {
        if (data.about_me) {
          try {
            const parsed = JSON.parse(data.about_me);
            
            if (parsed.image === '/golu.jpg' || !parsed.image) {
              parsed.image = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Golu';
            }
            setAboutData((prev: any) => ({ ...prev, ...parsed }));
  
          } catch(e) {
            console.error('Failed to parse about_me JSON', e);
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary-dark border border-white/10 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase">About Me</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          Who <span className="text-accent-yellow">I Am</span>
        </h2>
        <div className="w-16 h-1 bg-accent-blue mt-6"></div>
      </div>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-2/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent z-10"></div>
          {aboutData.image ? (
            <img src={aboutData.image} alt="About Me" className="w-full h-[400px] object-cover relative z-0" />
          ) : (
            <div className="w-full h-[400px] bg-secondary-dark flex items-center justify-center text-gray-500">No Image</div>
          )}
        </div>
        <div className="w-full md:w-3/5">
          <h3 className="text-3xl font-bold mb-6 text-white">{aboutData.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
            {aboutData.description}
          </p>
          
          {aboutData.skills && aboutData.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Core Skills</h4>
              <div className="flex flex-wrap gap-3">
                {aboutData.skills.map((skill: string, i: number) => (
                  <span key={i} className="bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
