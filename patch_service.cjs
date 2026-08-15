const fs = require('fs');
let s = fs.readFileSync('src/components/Services.tsx', 'utf8');
s = s.replace(
  /<h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">\s*<span className="text-accent-blue">Prod<\/span><span className="text-accent-yellow">uct<\/span>\s*<\/h2>/,
  '<h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4"><span className="text-accent-blue">Our</span> <span className="text-accent-yellow">Services</span></h2>'
);
fs.writeFileSync('src/components/Services.tsx', s);
