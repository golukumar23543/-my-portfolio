const fs = require('fs');

let content = fs.readFileSync('src/components/IndependenceDay.tsx', 'utf8');

// We want to remove the return statement's JSX output and replace it with return null;
// Find the return statement block.
const returnRegex = /if \(!isVisible\) return null;[\s\S]*return \([\s\S]*?\);\n}/;

content = content.replace(returnRegex, 'return null;\n}');

// Let's also remove unused imports like useState, X, Info, motion, AnimatePresence
content = content.replace(/import \{ useState, useEffect \} from 'react';/, "import { useEffect } from 'react';");
content = content.replace(/import \{ X, Info \} from 'lucide-react';\n/, "");
content = content.replace(/import \{ motion, AnimatePresence \} from 'motion\/react';\n/, "");

// Remove unused state
content = content.replace(/  const \[showModal, setShowModal\] = useState\(false\);\n/, "");
content = content.replace(/  const \[isVisible, setIsVisible\] = useState\(false\);\n/, "");
content = content.replace(/    setIsVisible\(true\);\n    \n/, "");

fs.writeFileSync('src/components/IndependenceDay.tsx', content);

