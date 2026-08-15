import fs from 'fs';
let content = fs.readFileSync('src/components/Services.tsx', 'utf8');

if (!content.includes("import { Link } from 'react-router-dom';")) {
  content = content.replace("import { MessageSquare } from 'lucide-react';", "import { MessageSquare } from 'lucide-react';\nimport { Link } from 'react-router-dom';");
}

const replacement = `
                   {s.liveLink && (
                     <a href={s.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-white/20 text-white text-center py-2.5 rounded-lg text-sm font-semibold transition-colors">
                       Preview
                     </a>
                   )}
                   <Link to={\`/service/\${s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`} className="flex-1 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark text-center py-2.5 rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-colors">
                     View Details
                   </Link>
`;

content = content.replace(
/                   \{s\.liveLink && \([\s\S]*?<\/a>\s*\)\}\s*\{!s\.link && !s\.liveLink && \(\s*<span className="text-gray-500 text-sm w-full text-center py-2">No links available<\/span>\s*\)\}/,
replacement
);

fs.writeFileSync('src/components/Services.tsx', content);
