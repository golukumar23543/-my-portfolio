const fs = require('fs');

let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf8');

const regex = /\{activeTab === 'projects' && \([\s\S]*?\{activeTab === 'gallery' && \(/;

const replacement = `{activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-white">Manage My Projects</label>
                    <button onClick={handleProjectAdd} className="bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95">
                      <Plus size={16} /> Add Project
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {(JSON.parse(settings.featured_work || '[]')).map((proj: any, i: number) => (
                      <div key={i} className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 relative flex flex-col md:flex-row gap-6 shadow-xl">
                         <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 z-10 bg-red-500/10 p-2 rounded-lg transition-colors"><Trash size={16} /></button>
                         
                         {/* Image Upload Area */}
                         <div className="w-full md:w-1/3 shrink-0">
                           <label className="block text-xs font-medium text-gray-400 mb-2">Project Image</label>
                           <div className="h-40 w-full bg-[#0a0a0a] border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-accent-blue overflow-hidden relative group" onClick={() => document.getElementById(\`proj-img-\${i}\`)?.click()}>
                             <input type="file" id={\`proj-img-\${i}\`} className="hidden" accept="image/*" onChange={(e) => updateProjectImage(e, i)} />
                             {proj.image ? (
                               <>
                                 <img src={proj.image} className="w-full h-full object-cover" />
                                 <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-sm font-bold text-white transition-all"><Camera size={18} className="mr-2"/> Change</div>
                               </>
                             ) : (
                               <div className="flex flex-col items-center"><Plus size={24} className="text-gray-500 mb-2" /><span className="text-xs text-gray-500 font-medium">Upload Image</span></div>
                             )}
                           </div>
                         </div>

                         {/* Details Area */}
                         <div className="flex-1 flex flex-col gap-3">
                           <div>
                             <label className="block text-xs font-medium text-gray-400 mb-1">Project Name</label>
                             <input type="text" value={proj.title || ''} onChange={e => updateProject(i, 'title', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-accent-blue outline-none transition-colors" placeholder="e.g. My Website" />
                           </div>
                           
                           <div className="flex flex-col md:flex-row gap-3">
                             <div className="flex-1">
                               <label className="block text-xs font-medium text-gray-400 mb-1">Platform Type</label>
                               <select value={proj.type || ''} onChange={e => updateProject(i, 'type', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-accent-blue outline-none transition-colors">
                                 <option value="" disabled>Select Type</option>
                                 <option value="Website">Website</option>
                                 <option value="App">App</option>
                                 <option value="Both App and Website">Both App and Website</option>
                                 <option value="WEB APP">WEB APP</option>
                                 <option value="TOOL">TOOL</option>
                                 <option value="WEB">WEB</option>
                               </select>
                             </div>
                             <div className="flex-1">
                               <label className="block text-xs font-medium text-gray-400 mb-1">Live URL (Link)</label>
                               <input type="text" value={proj.liveLink || ''} onChange={e => updateProject(i, 'liveLink', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-accent-blue outline-none transition-colors" placeholder="https://" />
                             </div>
                           </div>

                           <div>
                             <label className="block text-xs font-medium text-gray-400 mb-1">Note / Description</label>
                             <textarea value={proj.description || ''} onChange={e => updateProject(i, 'description', e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-accent-blue outline-none transition-colors resize-none" placeholder="Write a short note about this project..." rows={2} />
                           </div>

                           <div>
                             <label className="block text-xs font-medium text-gray-400 mb-1">Tags (Comma Separated)</label>
                             <input type="text" value={(proj.tags || []).join(', ')} onChange={e => updateProject(i, 'tags', e.target.value.split(',').map((t: string) => t.trim()))} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-accent-blue outline-none transition-colors" placeholder="e.g. React, Tailwind" />
                           </div>
                         </div>
                      </div>
                    ))}
                    {(JSON.parse(settings.featured_work || '[]')).length === 0 && (
                      <div className="p-8 text-center text-gray-500 bg-black/20 rounded-xl border border-white/5">No projects added yet.</div>
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'gallery' && (`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/AdminModal.tsx', content);

