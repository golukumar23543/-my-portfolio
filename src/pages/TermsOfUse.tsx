import { motion } from 'motion/react';

export default function TermsOfUse() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert prose-blue max-w-none"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-blue-500">
          Terms of Use & Site Guidelines
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Mr. Golu Prajapati ("we", "us", or "our"), concerning your access to and use of this website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
            </p>
            <p>
              You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site and you must discontinue use immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How to Use This Website</h2>
            <p className="mb-4">
              This website serves as a digital portfolio, service platform, and interactive space for exploring the work of Mr. Golu Prajapati. Here is a comprehensive guide on how to navigate and utilize the features of this site:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-400">
              <li>
                <strong className="text-white">Browsing the Portfolio:</strong> Navigate to the "Projects" section to view an interactive gallery of past work, source code links, and live demonstrations.
              </li>
              <li>
                <strong className="text-white">Exploring Services:</strong> Visit the "Services" tab to see what technical and creative solutions are offered, ranging from web development to graphic design.
              </li>
              <li>
                <strong className="text-white">Authentication & Profiles:</strong> You can create an account using the Login button. Authenticated users gain access to leave reviews, submit feedback, and manage their personal profiles.
              </li>
              <li>
                <strong className="text-white">Interactive Chatbot:</strong> A floating AI chatbot is available in the bottom corner of your screen. You can ask it questions about my skills, projects, and availability.
              </li>
              <li>
                <strong className="text-white">Feedback Submission:</strong> We highly value your opinion. Visit the Feedback page to leave suggestions or report bugs regarding the website experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
            </p>
            <p>
              The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Use, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Representations</h2>
            <p className="mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-400">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Prohibited Activities</h2>
            <p className="mb-4">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p>
              As a user of the Site, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
              <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Site Management & Modifications</h2>
            <p className="mb-4">
              We reserve the right, but not the obligation, to:
              (1) monitor the Site for violations of these Terms of Use;
              (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use;
              (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;
              (4) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
            </p>
            <p>
              We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Site at any time or for any reason without notice to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and defined following the laws of India. Mr. Golu Prajapati and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
            <p className="mb-4">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-gray-300">
              <p className="font-bold text-white mb-2">Mr. Golu Prajapati</p>
              <p>Patna, Bihar, India</p>
              <p>Phone: +91 8709107808</p>
              <p>Email: ambitiongolu@gmail.com</p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}
