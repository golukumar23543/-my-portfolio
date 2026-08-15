import fs from 'fs';

const footerPath = 'src/components/Footer.tsx';
let content = fs.readFileSync(footerPath, 'utf8');

if (!content.includes("import { Link } from 'react-router-dom';")) {
  content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';");
}

content = content.replace(
  '<div className="flex gap-4">\n          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>\n          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>\n        </div>',
  '<div className="flex gap-4">\n          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>\n          <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>\n        </div>'
);

fs.writeFileSync(footerPath, content);
