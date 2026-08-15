const fs = require('fs');

// 1. Navbar
let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
nav = nav.replace(
  /const links = \[[\s\S]*?\];/,
  `const links = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Learning Hub', path: '/learning-hub' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];`
);
fs.writeFileSync('src/components/Navbar.tsx', nav);

// 2. App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');

// replace imports
app = app.replace(
  "import VisualJourneyPage from './pages/VisualJourneyPage';",
  "import VisualJourneyPage from './pages/VisualJourneyPage';\nimport AboutPage from './pages/AboutPage';\nimport LearningHubPage from './pages/LearningHubPage';\nimport ContactPage from './pages/ContactPage';"
);

// replace routes
app = app.replace(
  /<Routes>[\s\S]*?<\/Routes>/,
  `<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/learning-hub" element={<LearningHubPage />} />
          <Route path="/gallery" element={<VisualJourneyPage />} />
          <Route path="/services" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/service/:slug" element={<ServicePage />} />
        </Routes>`
);
fs.writeFileSync('src/App.tsx', app);
