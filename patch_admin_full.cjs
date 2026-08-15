const fs = require('fs');

let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

// 1. Remove the old static 'Products' button
content = content.replace(
  /<button onClick=\{\(\) => setActiveTab\('services'\)\}[\s\S]*?<\/button>/,
  ""
);

// 2. Inject dynamic service tabs in the sidebar
// Find where Gallery button is, and inject after it
const galleryBtn = `<button onClick={() => setActiveTab('gallery')} className={\`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start \${activeTab === 'gallery' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                <Camera size={18} /> Gallery
              </button>`;

const dynamicTabs = `
              <div className="hidden md:block h-px bg-white/10 my-2 shrink-0"></div>
              <div className="text-xs font-bold text-gray-500 uppercase px-4 py-2 flex justify-between items-center">
                 Services
                 <button onClick={() => {
                     let current = [];
                     try { current = JSON.parse(settings.services || '[]'); } catch(e){}
                     current.push({ title: 'New Service', image: '', price: 'Free', link: '', liveLink: '', desc: '', content: '' });
                     handleSettingChange('services', JSON.stringify(current));
                     setActiveTab('service-' + (current.length - 1));
                 }} className="hover:text-white bg-white/5 rounded p-1"><Plus size={12} /></button>
              </div>
              {(() => {
                let services = [];
                try { services = JSON.parse(settings.services || '[]'); } catch(e){}
                return services.map((srv, idx) => (
                  <button key={'srv-'+idx} onClick={() => setActiveTab('service-' + idx)} className={\`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start \${activeTab === 'service-' + idx ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                    <Layers size={18} /> <span className="truncate max-w-[150px]">{srv.title}</span>
                  </button>
                ));
              })()}
              <div className="hidden md:block h-px bg-white/10 my-2 shrink-0"></div>
`;

content = content.replace(galleryBtn, galleryBtn + '\n' + dynamicTabs);


// 3. Now replace the old '{activeTab === 'services' && ( ... )}' logic with dynamic logic
// First let's remove the old activeTab === 'services' block entirely, and replace it with a new block that handles activeTab.startsWith('service-')

const oldServicesBlockRegex = /\{activeTab === 'services' && \([\s\S]*?\{activeTab === 'gallery' && \(/;

const newServiceEditorBlock = `
              {activeTab.startsWith('service-') && (
                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6 space-y-4 shadow-xl">
                  {(() => {
                     const idx = parseInt(activeTab.split('-')[1]);
                     let current = [];
                     try { current = JSON.parse(settings.services || '[]'); } catch(e){}
                     const srv = current[idx];
                     if (!srv) return <div className="text-gray-400">Service not found.</div>;
                     
                     const updateSrv = (field, value) => {
                       const next = [...current];
                       next[idx] = { ...next[idx], [field]: value };
                       handleSettingChange('services', JSON.stringify(next));
                     };

                     return (
                       <>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black text-white font-heading tracking-tight">Edit Service: {srv.title}</h3>
                        <button onClick={() => {
                          const next = [...current];
                          next.splice(idx, 1);
                          handleSettingChange('services', JSON.stringify(next));
                          setActiveTab('aboutme'); // redirect
                        }} className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
                           <Trash size={16} /> Delete Service
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                        <div 
                           className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white cursor-pointer hover:border-accent-blue transition-colors flex items-center justify-between"
                           onClick={() => setShowGalleryPicker({ active: true, onSelect: (url) => { updateSrv('image', url); setShowGalleryPicker({ active: false, onSelect: () => {} }); } })}
                        >
                           <span className="truncate">{srv.image || 'Click to select from gallery...'}</span>
                           <Camera size={16} className="text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Product/Service Name</label>
                        <input type="text" value={srv.title} onChange={e => updateSrv('title', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Website Development" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                        <input type="text" value={srv.price} onChange={e => updateSrv('price', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Starts at $999" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Dedicated Page Content (Markdown/HTML supported)</label>
                        <textarea value={srv.content || ''} onChange={e => updateSrv('content', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors h-64 resize-none font-mono" placeholder="Write full details about this service/product for its dedicated webpage. You can use Markdown or HTML..." />
                        <p className="text-xs text-gray-500 mt-1">If this is provided, a dedicated webpage for this service will be available.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>
                        <textarea value={srv.desc} onChange={e => updateSrv('desc', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none" placeholder="Short description for the home page card" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Download Link (URL)</label>
                        <input type="text" value={srv.link} onChange={e => updateSrv('link', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="https://" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Live Preview Link (URL) - Optional</label>
                        <input type="text" value={srv.liveLink || ''} onChange={e => updateSrv('liveLink', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="https://" />
                      </div>
                       </>
                     );
                  })()}
                </div>
              )}
              {activeTab === 'gallery' && (`;

content = content.replace(oldServicesBlockRegex, newServiceEditorBlock);

fs.writeFileSync('src/components/AdminModal.tsx', content);

