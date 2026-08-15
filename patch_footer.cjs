const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Replace standard links
content = content.replace(
  /<a href={`#\$\{serviceId\}`} className="text-gray-400 hover:text-accent-blue text-sm transition-colors">\{title\}<\/a>/g,
  `<Link to={\`/service/\${serviceId.replace('service-', '')}\`} className="text-gray-400 hover:text-accent-blue text-sm transition-colors">{title}</Link>`
);

fs.writeFileSync('src/components/Footer.tsx', content);
