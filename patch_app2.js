import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "import TermsOfUse from './pages/TermsOfUse';",
  "import TermsOfUse from './pages/TermsOfUse';\nimport ServicePage from './pages/ServicePage';"
);

content = content.replace(
  '<Route path="/terms-of-use" element={<TermsOfUse />} />',
  '<Route path="/terms-of-use" element={<TermsOfUse />} />\n          <Route path="/service/:slug" element={<ServicePage />} />'
);

fs.writeFileSync('src/App.tsx', content);
