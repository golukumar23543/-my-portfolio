import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<any>({
    email: 'ambitiongolu@gmail.com',
    phone: '+91 8709107808',
    address: 'Patna, Bihar, India'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getSettings().then(data => {
      if (data.contact) {
        try {
          setContactInfo(JSON.parse(data.contact));
        } catch(e) {}
      }
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      e.target.reset();
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white">
          Contact Me
        </h1>
        <p className="text-gray-400 text-lg">Let's discuss your next big project.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          
          <div className="flex items-center gap-4 bg-secondary-dark p-6 rounded-2xl border border-white/5 hover:border-accent-blue transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent-blue">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Email</p>
              <a href={`mailto:${contactInfo.email}`} className="text-lg font-bold text-white hover:text-accent-blue">{contactInfo.email}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-secondary-dark p-6 rounded-2xl border border-white/5 hover:border-accent-blue transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-green-400">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Phone / WhatsApp</p>
              <a href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-green-400">{contactInfo.phone}</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-secondary-dark p-6 rounded-2xl border border-white/5 hover:border-accent-blue transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-accent-yellow">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">Location</p>
              <p className="text-lg font-bold text-white">{contactInfo.address}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-secondary-dark border border-white/10 p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input required type="text" className="w-full bg-primary-dark border border-white/10 rounded-xl p-3 text-white focus:border-accent-blue outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input required type="email" className="w-full bg-primary-dark border border-white/10 rounded-xl p-3 text-white focus:border-accent-blue outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea required className="w-full h-32 bg-primary-dark border border-white/10 rounded-xl p-3 text-white focus:border-accent-blue outline-none resize-none"></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-accent-blue text-primary-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
              {isSubmitting ? 'Sending...' : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
            {success && <p className="text-green-400 text-center text-sm font-bold mt-4">Message sent successfully!</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
