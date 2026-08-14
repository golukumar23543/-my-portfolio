import fs from 'fs';
let code = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

const targetForm = `<div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Product Type</label>
                        <select value={editingProduct.type} onChange={e => setEditingProduct({...editingProduct, type: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white appearance-none focus:outline-none focus:border-white/30 transition-colors">
                          <option value="Free">Free</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>`;

const newForm = `<div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                        <input type="text" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Free, $10, Contact for Price" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <textarea value={editingProduct.desc} onChange={e => setEditingProduct({...editingProduct, desc: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none" placeholder="Description of the product" />
                      </div>`;

code = code.replace(targetForm, newForm);

const targetSave = `const newProduct = { title: editingProduct.title, image: editingProduct.image, price: editingProduct.type, link: editingProduct.link, liveLink: editingProduct.liveLink, desc: '' };`;
const newSave = `const newProduct = { title: editingProduct.title, image: editingProduct.image, price: editingProduct.price, link: editingProduct.link, liveLink: editingProduct.liveLink, desc: editingProduct.desc };`;

code = code.replace(targetSave, newSave);

const targetEdit = `setEditingProduct({ title: srv.title || '', image: srv.image || '', type: srv.price || 'Free', link: srv.link || '', liveLink: srv.liveLink || '' });`;
const newEdit = `setEditingProduct({ title: srv.title || '', image: srv.image || '', price: srv.price || 'Free', link: srv.link || '', liveLink: srv.liveLink || '', desc: srv.desc || '' });`;

code = code.replace(targetEdit, newEdit);

const targetFeedback = `<p className="text-white bg-black/20 p-4 rounded-lg mt-3">{fb.feedback}</p>`;
const newFeedback = `<p className="text-white bg-black/20 p-4 rounded-lg mt-3">{fb.feedback}</p>
                          {fb.image_url && <img src={fb.image_url} alt="Feedback" className="mt-4 max-h-64 rounded-xl border border-white/10" />}`;

code = code.replace(targetFeedback, newFeedback);

fs.writeFileSync('src/components/AdminModal.tsx', code);
