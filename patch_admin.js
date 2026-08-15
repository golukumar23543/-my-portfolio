import fs from 'fs';
let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

content = content.replace(
  "const [editingProduct, setEditingProduct] = useState({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '' });",
  "const [editingProduct, setEditingProduct] = useState({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '', content: '' });"
);

content = content.replace(
  "const newProduct = { title: editingProduct.title, image: editingProduct.image, price: editingProduct.price, link: editingProduct.link, liveLink: editingProduct.liveLink, desc: editingProduct.desc };",
  "const newProduct = { title: editingProduct.title, image: editingProduct.image, price: editingProduct.price, link: editingProduct.link, liveLink: editingProduct.liveLink, desc: editingProduct.desc, content: editingProduct.content };"
);

content = content.replace(
  "setEditingProduct({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '' });",
  "setEditingProduct({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '', content: '' });"
);
content = content.replace(
  "setEditingProduct({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '' });",
  "setEditingProduct({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '', content: '' });"
);
content = content.replace(
  "setEditingProduct({ title: srv.title || '', image: srv.image || '', price: srv.price || 'Free', link: srv.link || '', liveLink: srv.liveLink || '', desc: srv.desc || '' });",
  "setEditingProduct({ title: srv.title || '', image: srv.image || '', price: srv.price || 'Free', link: srv.link || '', liveLink: srv.liveLink || '', desc: srv.desc || '', content: srv.content || '' });"
);

// We need to insert a text area for `content`
const contentField = `
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Dedicated Page Content (Markdown/HTML supported)</label>
                        <textarea value={editingProduct.content || ''} onChange={e => setEditingProduct({...editingProduct, content: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors h-64 resize-none font-mono" placeholder="Write full details about this service/product for its dedicated webpage. You can use Markdown or HTML..." />
                        <p className="text-xs text-gray-500 mt-1">If this is provided, a dedicated webpage for this service will be available.</p>
                      </div>
`;
content = content.replace(
  /<div>\s*<label className="block text-sm font-medium text-gray-400 mb-2">Description<\/label>\s*<textarea value={editingProduct.desc}/g,
  contentField + '\n                      <div>\n                        <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>\n                        <textarea value={editingProduct.desc}'
);

fs.writeFileSync('src/components/AdminModal.tsx', content);
