const fs = require('fs');

let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

// Add Contact Tab and Learning Hub Tab to navigation
content = content.replace(
  /<button\s*onClick=\{\(\) => setActiveTab\('feedback'\)\}[\s\S]*?Feedback\s*<\/button>/,
  `<button onClick={() => setActiveTab('feedback')} className={\`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold text-sm flex items-center gap-3 \${activeTab === 'feedback' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                  <MessageSquare size={16} />
                  Feedback
                </button>
                <button onClick={() => setActiveTab('contact')} className={\`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold text-sm flex items-center gap-3 \${activeTab === 'contact' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                  <Phone size={16} />
                  Contact Info
                </button>
                <button onClick={() => setActiveTab('learning')} className={\`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold text-sm flex items-center gap-3 \${activeTab === 'learning' ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}\`}>
                  <BookOpen size={16} />
                  Learning Hub
                </button>`
);

// We need to add the import for BookOpen and Phone if they don't exist
if (!content.includes('BookOpen')) {
  content = content.replace('import { X, Save', 'import { X, Save, BookOpen, Phone');
}

// Add content for Contact tab
const contactTab = `
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                  {(() => {
                    let data = { email: 'ambitiongolu@gmail.com', phone: '+91 8709107808', address: 'Patna, Bihar, India' };
                    try { if (settings.contact) data = JSON.parse(settings.contact); } catch(e){}
                    return (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                          <input type="email" value={data.email} onChange={e => handleSettingChange('contact', JSON.stringify({ ...data, email: e.target.value }))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                          <input type="text" value={data.phone} onChange={e => handleSettingChange('contact', JSON.stringify({ ...data, phone: e.target.value }))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Address / Location</label>
                          <input type="text" value={data.address} onChange={e => handleSettingChange('contact', JSON.stringify({ ...data, address: e.target.value }))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white" />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
`;

// Add content for Learning Hub tab
const learningTab = `
              {activeTab === 'learning' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Learning Resources</h3>
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
                    {(JSON.parse(settings.learning_hub || '[]')).map((res: any, i: number) => (
                      <div key={i} className="bg-[#1a1a1a] p-4 rounded-xl border border-white/10 relative">
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
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white" placeholder="Resource Title" />
                          
                          <select value={res.type} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].type = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white">
                            <option>Article</option>
                            <option>Video</option>
                            <option>Course</option>
                          </select>

                          <input type="text" value={res.link} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].link = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white" placeholder="URL" />

                          <textarea value={res.desc} onChange={e => {
                            let current = JSON.parse(settings.learning_hub || '[]');
                            current[i].desc = e.target.value;
                            handleSettingChange('learning_hub', JSON.stringify(current));
                          }} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2 text-sm text-white resize-none" placeholder="Description"></textarea>
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

content = content.replace(
  /\{activeTab === 'feedback' && \([\s\S]*?<\/div>\s*\)\s*\}/,
  `$&
  ${contactTab}
  ${learningTab}`
);

fs.writeFileSync('src/components/AdminModal.tsx', content);
