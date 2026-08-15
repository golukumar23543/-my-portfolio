import fs from 'fs';

const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// Add imports
content = content.replace(
  "import FeedbackPage from './pages/FeedbackPage';",
  "import FeedbackPage from './pages/FeedbackPage';\nimport PrivacyPolicy from './pages/PrivacyPolicy';\nimport TermsOfUse from './pages/TermsOfUse';"
);

// Add routes
content = content.replace(
  '<Route path="/feedback" element={<FeedbackPage />} />',
  '<Route path="/feedback" element={<FeedbackPage />} />\n          <Route path="/privacy-policy" element={<PrivacyPolicy />} />\n          <Route path="/terms-of-use" element={<TermsOfUse />} />'
);

fs.writeFileSync(appPath, content);
