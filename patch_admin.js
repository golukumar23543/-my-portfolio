const fs = require('fs');
let code = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

// Add Description & Price to Editing Product State
code = code.replace(
  /const \[editingProduct, setEditingProduct\] = useState\(\{ title: '', image: '', type: 'Free', link: '', liveLink: '' \}\);/g,
  "const [editingProduct, setEditingProduct] = useState({ title: '', image: '', price: 'Free', link: '', liveLink: '', desc: '' });"
);

// Add fields in the "add" product form
code = code.replace(
  /<label className="block text-sm font-medium text-gray-400 mb-2">Product Type<\/label>\s*<select value=\{editingProduct\.type\} onChange=\{e => setEditingProduct\(\{\.\.\.editingProduct, type: e\.target\.value\}\)\} className="w-full bg-\[\#0a0a0a\] border border-white\/10 rounded-xl p-3 text-sm text-white appearance-none focus:outline-none focus:border-white\/30 transition-colors">\s*<option value="Free">Free<\/option>\s*<option value="Paid">Paid<\/option>\s*<\/select>/,
  `<label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
<input type="text" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. $10, Free" />
</div>
<div>
<label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
<textarea value={editingProduct.desc} onChange={e => setEditingProduct({...editingProduct, desc: e.target.value})} className="w-full h-24 resize-none bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="Product description" />`
);

// Fix the Save Product logic
code = code.replace(
  /const newProduct = \{ title: editingProduct\.title, image: editingProduct\.image, price: editingProduct\.type, link: editingProduct\.link, liveLink: editingProduct\.liveLink, desc: '' \};/g,
  "const newProduct = { title: editingProduct.title, image: editingProduct.image, price: editingProduct.price, link: editingProduct.link, liveLink: editingProduct.liveLink, desc: editingProduct.desc };"
);

code = code.replace(
  /setEditingProduct\(\{ title: '', image: '', type: 'Free', link: '', liveLink: '' \}\);/g,
  "setEditingProduct({ title: '', image: '', price: 'Free', link: '', liveLink: '', desc: '' });"
);

code = code.replace(
  /setEditingProduct\(\{ title: srv\.title \|\| '', image: srv\.image \|\| '', type: srv\.price \|\| 'Free', link: srv\.link \|\| '', liveLink: srv\.liveLink \|\| '' \}\);/g,
  "setEditingProduct({ title: srv.title || '', image: srv.image || '', price: srv.price || 'Free', link: srv.link || '', liveLink: srv.liveLink || '', desc: srv.desc || '' });"
);

// Add image viewing in feedbacks
code = code.replace(
  /<p className="text-white bg-black\/20 p-4 rounded-lg mt-3">\{fb\.feedback\}<\/p>/,
  `<p className="text-white bg-black/20 p-4 rounded-lg mt-3">{fb.feedback}</p>
{fb.image_url && <img src={fb.image_url} alt="Feedback attached" className="mt-4 max-h-64 rounded-xl border border-white/10" />}`
);

fs.writeFileSync('src/components/AdminModal.tsx', code);
