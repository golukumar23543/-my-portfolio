import fs from 'fs';

const path = 'src/components/AboutMe.tsx';
let content = fs.readFileSync(path, 'utf8');

const newDescription = `Hello! I am Mr. Golu Prajapati, a passionate technologist and software developer currently pursuing my Diploma in Computer Science Engineering (CSE) at NSIT (Netaji Subhas Institute of Technology).

I have a strong foundation in programming and a deep curiosity for how things work behind the scenes. My technical expertise spans across core web technologies like HTML, CSS, and JavaScript, as well as robust programming languages including Java, C, and Python. I am also actively honing my problem-solving skills through Data Structures & Algorithms (DSA).

Beyond coding, I am a highly adaptable communicator, fluent in Hindi, Bhojpuri, and English. This linguistic versatility allows me to connect with diverse teams and clients effectively. I believe in continuous learning, writing clean code, and building software that creates a positive impact.

Whether it's developing dynamic user interfaces or tackling complex logical challenges, I approach every project with discipline and purpose. Let's build something extraordinary together!

📞 Contact No: +91 8709107808`;

// Replace description
content = content.replace(
  /description: `Hello! My name is Mr. Golu Prajapati[\s\S]*?8709107808`/,
  `description: \`${newDescription}\``
);

// Replace skills array
content = content.replace(
  /skills: \['HTML', 'CSS', 'JavaScript', 'Java', 'C Language', 'Python', 'DSA Basics'\]/,
  `skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'C Language', 'Python', 'DSA']`
);

// Add cleanup logic for empty fields in DB
const cleanupLogic = `
            if (parsed.image === '/golu.jpg' || !parsed.image) {
              parsed.image = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Golu';
            }
            
            // Ensure empty database strings don't override our beautiful defaults
            if (!parsed.title || !parsed.title.trim()) delete parsed.title;
            if (!parsed.description || !parsed.description.trim()) delete parsed.description;
            if (!parsed.skills || parsed.skills.length === 0 || (parsed.skills.length === 1 && parsed.skills[0].trim() === "")) delete parsed.skills;
`;

content = content.replace(
  /if \(parsed\.image === '\/golu\.jpg' \|\| !parsed\.image\) \{\s*parsed\.image = 'https:\/\/api\.dicebear\.com\/7\.x\/avataaars\/svg\?seed=Golu';\s*\}/,
  cleanupLogic
);

fs.writeFileSync(path, content);
