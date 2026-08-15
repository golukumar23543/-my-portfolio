import AboutMe from '../components/AboutMe';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">
      <AboutMe />
    </motion.div>
  );
}
