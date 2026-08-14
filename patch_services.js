import fs from 'fs';
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

const targetImport = `import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';`;

const newImport = `import { useState, useEffect } from 'react';
import { getSettings } from '../lib/api';
import ProductFeedbackModal from './ProductFeedbackModal';
import { MessageSquare } from 'lucide-react';`;

code = code.replace(targetImport, newImport);

const targetState = `const [services, setServices] = useState<any[]>([`;
const newState = `const [activeFeedbackProduct, setActiveFeedbackProduct] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([`;

code = code.replace(targetState, newState);

const targetButtons = `<div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">`;
const newButtons = `<div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                   <button onClick={() => setActiveFeedbackProduct(s.title)} className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-lg border border-white/10 transition-colors" title="Leave Feedback">
                     <MessageSquare size={16} />
                   </button>`;

code = code.replace(targetButtons, newButtons);

const targetEnd = `</section>
  );
}`;
const newEnd = `</section>
      {activeFeedbackProduct && <ProductFeedbackModal productTitle={activeFeedbackProduct} onClose={() => setActiveFeedbackProduct(null)} />}
    </>
  );
}`;

code = code.replace(targetEnd, newEnd);
code = code.replace(`return (\n    <section`, `return (\n    <>\n      <section`);

fs.writeFileSync('src/components/Services.tsx', code);
