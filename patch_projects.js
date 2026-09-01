import fs from 'fs';

let content = fs.readFileSync('src/components/Projects.tsx', 'utf8');

// Ensure useLocation is imported
if (!content.includes('useLocation')) {
  content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useLocation, Link } from 'react-router-dom';");
}

// Ensure Link is imported if missing but useLocation might have been added
if (!content.includes('Link } from \'react-router-dom\'')) {
  content = content.replace(/import \{ useLocation \} from 'react-router-dom';/, "import { useLocation, Link } from 'react-router-dom';");
}

// Inside the component, get location
const getLocRegex = /export default function Projects\(\) \{/;
content = content.replace(getLocRegex, "export default function Projects() {\n  const location = useLocation();\n  const isProjectsPage = location.pathname === '/projects';");

// Limit the projects to 4 if not on projects page
const mapRegex = /\{projects\.map\(\(project, idx\)/;
content = content.replace(mapRegex, "{(isProjectsPage ? projects : projects.slice(0, 4)).map((project, idx)");

// Change the View All Projects button
const btnRegex = /<div className="flex justify-center">\s*<a href="https:\/\/github\.com\/nexott_store"[\s\S]*?View All Projects[\s\S]*?<\/a>\s*<\/div>/;

const newBtn = `
          {!isProjectsPage && projects.length > 4 && (
            <div className="flex justify-center">
              <Link to="/projects" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-8 py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                View All Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          )}
          {isProjectsPage && (
            <div className="flex justify-center mt-12 text-gray-500 font-medium">
              You've reached the end of the projects.
            </div>
          )}
`;

content = content.replace(btnRegex, newBtn);

fs.writeFileSync('src/components/Projects.tsx', content);

