const fs = require('fs');
let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

const contactLearningSidebar = `
              <button onClick={() => setActiveTab('contact')} className={\`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start \${activeTab === 'contact' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                <Phone size={18} /> Contact Info
              </button>
              <button onClick={() => setActiveTab('learning')} className={\`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start \${activeTab === 'learning' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                <BookOpen size={18} /> Learning Hub
              </button>
`;

const gallerySidebarRegex = /<button onClick=\{\(\) => setActiveTab\('gallery'\)\}[\s\S]*?<\/button>/;
content = content.replace(gallerySidebarRegex, `$&` + '\n' + contactLearningSidebar);

const contactLearningContent = `
              {activeTab === 'contact' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                  {(() => {
                    let data = { email: 'ambitiongolu@gmail.com', phone: '+91 8709107808', address: 'Patna, Bihar, India' };
                    try { if (settings.contact) data = JSON.parse(settings.contact); } catch(e){}
                    return (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                          <input type="email" value={data.email} onChange={e => handleSettingChange('contact', JSON.stringify({ ...data, email: e.target.value }))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-blue outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number / WhatsApp</label>
                          <input type="text" value={data.phone} onChange={e => handleSettingChange('contact', JSON.stringify({ ...data, phone: e.target.value }))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-blue outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Address / Location</label>
                          <input type="text" value={data.address} onChange={e => handleSettingChange('contact', JSON.stringify({ ...data, address: e.target.value }))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-accent-blue outline-none" />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
              
              {activeTab === 'learning' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Learning Resources</h3>
                        <p className="text-gray-400 text-xs mt-1">Manage articles, videos, and tutorials.</p>
                    </div>
                    <button onClick={() => {
                      let current = [];
                      try { current = JSON.parse(settings.learning_hub || '[]'); } catch(e){}
                      current.push({ title: 'New Resource', type: 'Article', link: '#', desc: 'Description' });
                      handleSettingChange('learning_hub', JSON.stringify(current));
                    }} className="bg-accent-blue text-primary-dark px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                      <Plus size={16} /> Add Resource
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(JSON.parse(settings.learning_hub || '[]')).map((res, i) => (
                      <div key={i} className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 relative group hover:border-accent-blue transition-colors">
                        <button onClick={() => {
                          let current = JSON.parse(settings.learning_hub || '[]');
                          current.splice(i, 1);
                          handleSettingChange('learning_hub', JSON.stringify(current));
                        }} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                          <Trash size={16} />
                        </button>
                        <div className="space-y-3 pr-8">
                          <input type="text" value={res.title} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].title = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-accent-blue outline-none" placeholder="Resource Title" />
                          
                          <select value={res.type} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].type = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-accent-blue outline-none">
                            <option>Article</option>
                            <option>Video</option>
                            <option>Course</option>
                          </select>

                          <input type="text" value={res.link} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].link = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-accent-blue outline-none" placeholder="URL Link" />

                          <textarea value={res.desc} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].desc = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-accent-blue outline-none resize-none" placeholder="Short description"></textarea>
                        </div>
                      </div>
                    ))}
                    {(JSON.parse(settings.learning_hub || '[]')).length === 0 && (
                      <div className="col-span-full p-8 text-center text-gray-500 bg-black/20 rounded-xl border border-white/5">No learning resources added.</div>
                    )}
                  </div>
                </div>
              )}
`;

const galleryContentRegex = /\{activeTab === 'gallery' && \(/;
content = content.replace(galleryContentRegex, contactLearningContent + '\n' + `$&`);

fs.writeFileSync('src/components/AdminModal.tsx', content);
