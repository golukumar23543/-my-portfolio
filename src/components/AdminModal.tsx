import { useState, useEffect, type FormEvent } from 'react';
import { X, Save, MessageSquare, Settings, Image as ImageIcon, Briefcase, Users, Layers, Camera, Plus, Trash, UserSquare2, Activity } from 'lucide-react';
import { getSettings, saveSettings, getFeedbacks, getSessions, getUsers, getPageViews, deleteUser, deleteFeedback } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AdminModal({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('settings');
  const [activeProductTab, setActiveProductTab] = useState<'add'|'manage'>('manage');
  const [editingProductIdx, setEditingProductIdx] = useState<number | null>(null);
  const [showGalleryPicker, setShowGalleryPicker] = useState<{ active: boolean, onSelect: (url: string) => void }>({ active: false, onSelect: () => {} });
  const [editingProduct, setEditingProduct] = useState({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '', content: '' });


  const [settings, setSettings] = useState<any>({
    profile_image: '',
    about_me: '',
    featured_work: '[]',
    featured_html: '',
    services: '[]',
    gallery: '[]'
  });

  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [pageViewsData, setPageViewsData] = useState<{views: any[], total: number}>({ views: [], total: 0 });
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    getSettings()
      .then(data => {
        setSettings((prev: any) => ({
          ...prev,
          ...data
        }));
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Load all data when authenticated so it's ready for cross-referencing
      getFeedbacks().then(data => setFeedbacks(data)).catch(console.error);
      getSessions().then(data => setSessions(data)).catch(console.error);
      getUsers().then(data => setUsers(data)).catch(console.error);
      getPageViews().then(data => setPageViewsData(data)).catch(console.error);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'Virus@93') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleSave = async () => {
    try {
      const res = await saveSettings({ ...settings });
      if (res.success) {
        window.location.reload();
      } else {
        setError('Failed to save');
      }
    } catch(err) {
      setError('Error saving settings to database. Images size maybe too large.');
    }
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const compressImage = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800; // Cap image size to prevent proxy payload limit errors
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7)); // Compress to jpeg with 70% quality
      };
      img.src = evt.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: any, key: string, isArray: boolean = false) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        if (isArray) {
          let current = [];
          try { current = JSON.parse(settings[key] || '[]'); } catch(e){}
          current.push({ url: compressedBase64, caption: '' });
          handleSettingChange(key, JSON.stringify(current));
        } else {
          handleSettingChange(key, compressedBase64);
        }
      });
    }
  };

  const handleProjectAdd = () => {
    let current = [];
    try { current = JSON.parse(settings.featured_work || '[]'); } catch(e){}
    current.push({ title: 'New Project', type: 'WEB', description: 'Description', tags: [], image: '', codeLink: '', liveLink: '' });
    handleSettingChange('featured_work', JSON.stringify(current));
  };

  const updateProject = (index: number, field: string, value: any) => {
    let current = [];
    try { current = JSON.parse(settings.featured_work || '[]'); } catch(e){}
    current[index][field] = value;
    handleSettingChange('featured_work', JSON.stringify(current));
  };

  const removeProject = (index: number) => {
    let current = [];
    try { current = JSON.parse(settings.featured_work || '[]'); } catch(e){}
    current.splice(index, 1);
    handleSettingChange('featured_work', JSON.stringify(current));
  };

  const updateProjectImage = (e: any, index: number) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        updateProject(index, 'image', compressedBase64);
      });
    }
  };

  const handleServiceAdd = () => {
    let current = [];
    try { current = JSON.parse(settings.services || '[]'); } catch(e){}
    current.push({ title: 'New Service', desc: 'Description', price: '$0', image: '', link: '#' });
    handleSettingChange('services', JSON.stringify(current));
  };

  const updateService = (index: number, field: string, value: string) => {
    let current = [];
    try { current = JSON.parse(settings.services || '[]'); } catch(e){}
    current[index][field] = value;
    handleSettingChange('services', JSON.stringify(current));
  };

  const removeService = (index: number) => {
    let current = [];
    try { current = JSON.parse(settings.services || '[]'); } catch(e){}
    current.splice(index, 1);
    handleSettingChange('services', JSON.stringify(current));
  };

  const updateServiceImage = (e: any, index: number) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        updateService(index, 'image', compressedBase64);
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    let current = [];
    try { current = JSON.parse(settings.gallery || '[]'); } catch(e){}
    current.splice(index, 1);
    handleSettingChange('gallery', JSON.stringify(current));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-secondary-dark border border-white/10 rounded-[2rem] w-full max-w-[1400px] h-[95vh] max-h-[900px] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Settings size={20} className="text-accent-blue" />
            Admin Dashboard
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors active:scale-95">
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
           <div className="p-8 flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="bg-primary-dark p-8 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6 text-center">Login to Admin Panel</h3>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-widest">Admin Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-secondary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors" 
                    placeholder="Enter password" 
                  />
                  {error && <p className="text-red-400 text-sm mt-2 font-medium bg-red-400/10 p-2 rounded-lg">{error}</p>}
                </div>
                <button className="w-full bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-accent-blue/20 active:scale-95">
                  Authenticate required
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/10 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto shrink-0 snap-x">
              <button onClick={() => setActiveTab('settings')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'settings' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <ImageIcon size={18} /> Profile Image
              </button>
              <button onClick={() => setActiveTab('aboutme')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'aboutme' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <UserSquare2 size={18} /> About Me
              </button>
              <button onClick={() => setActiveTab('projects')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'projects' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Briefcase size={18} /> My Projects
              </button>
              <button onClick={() => setActiveTab('services')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'services' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Layers size={18} /> Products
              </button>
              <button onClick={() => setActiveTab('gallery')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'gallery' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Camera size={18} /> Gallery
              </button>
              <div className="hidden md:block h-px bg-white/10 my-4 shrink-0"></div>
              <button onClick={() => setActiveTab('users')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'users' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <UserSquare2 size={18} /> Users Database
              </button>
              <button onClick={() => setActiveTab('analytics')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'analytics' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Users size={18} /> User Sessions
              </button>
              <button onClick={() => setActiveTab('traffic')} className={`shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'traffic' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Activity size={18} /> Web Traffic
              </button>
              <button onClick={() => setActiveTab('feedbacks')} className={`shrink-0 w-auto md:w-full flex items-center justify-between px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap snap-start ${activeTab === 'feedbacks' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <div className="flex items-center gap-3"><MessageSquare size={18} /> User Feedbacks</div>
              </button>
            </div>


            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-primary-dark/30">
              
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  <label className="block text-sm font-medium text-white mb-2">Profile Image</label>
                  <p className="text-gray-400 text-xs mb-3">Upload your profile image.</p>
                  
                  <div className="border-2 border-dashed border-white/20 hover:border-accent-blue transition-colors rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer relative" onClick={() => document.getElementById('profile-upload')?.click()}>
                    <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile_image')} />
                    {settings.profile_image ? (
                        <img src={settings.profile_image} className="h-40 w-auto rounded-xl object-contain shadow-lg" alt="Profile" />
                    ) : (
                       <div className="flex flex-col items-center text-gray-500">
                          <Plus size={40} className="mb-2" />
                          <span className="text-sm font-semibold">Click to browse gallery</span>
                       </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'aboutme' && (
                <div className="space-y-6 max-w-2xl">
                  <label className="block text-sm font-medium text-white mb-2">About Me Section</label>
                  <p className="text-gray-400 text-xs mb-3">Manage the About Me section data.</p>
                  
                  <div className="space-y-4">
                    {(() => {
                      let data: any = { title: '', description: '', image: '', skills: [] };
                      try { if (settings.about_me) data = JSON.parse(settings.about_me); } catch(e){}
                      return (
                        <>
                          <div className="border-2 border-dashed border-white/20 hover:border-accent-blue transition-colors rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer relative" onClick={() => document.getElementById('aboutme-upload')?.click()}>
                            <input type="file" id="aboutme-upload" className="hidden" accept="image/*" onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) {
                                 compressImage(file, (compressed) => {
                                   handleSettingChange('about_me', JSON.stringify({ ...data, image: compressed }));
                                 });
                               }
                            }} />
                            {data.image ? (
                                <img src={data.image} className="h-32 w-auto rounded-lg object-contain shadow-lg" alt="About" />
                            ) : (
                               <div className="flex flex-col items-center text-gray-500">
                                  <Plus size={24} className="mb-1" />
                                  <span className="text-xs font-semibold">Upload Image</span>
                               </div>
                            )}
                          </div>
                          
                          <input type="text" value={data.title || ''} onChange={e => handleSettingChange('about_me', JSON.stringify({ ...data, title: e.target.value }))} className="w-full bg-secondary-dark border border-white/10 rounded-xl p-3 text-sm text-white" placeholder="Section Title (e.g. About Me)" />
                          
                          <textarea value={data.description || ''} onChange={e => handleSettingChange('about_me', JSON.stringify({ ...data, description: e.target.value }))} className="w-full bg-secondary-dark border border-white/10 rounded-xl p-3 text-sm text-white resize-none h-32" placeholder="Description" />
                          
                          <input type="text" value={(data.skills || []).join(', ')} onChange={e => handleSettingChange('about_me', JSON.stringify({ ...data, skills: e.target.value.split(',').map((s:string) => s.trim()).filter(Boolean) }))} className="w-full bg-secondary-dark border border-white/10 rounded-xl p-3 text-sm text-white" placeholder="Skills (comma separated, e.g. React, Node.js)" />
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-white">Manage My Projects</label>
                    <button onClick={handleProjectAdd} className="bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all active:scale-95">
                      <Plus size={16} /> Add Project
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(JSON.parse(settings.featured_work || '[]')).map((proj: any, i: number) => (
                      <div key={i} className="bg-secondary-dark p-4 rounded-xl border border-white/10 relative flex flex-col gap-2">
                         <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 z-10 bg-black/50 p-1.5 rounded-full"><Trash size={16} /></button>
                         <div className="mb-2">
                           <div className="h-32 w-full bg-primary-dark border border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent-blue overflow-hidden relative" onClick={() => document.getElementById(`proj-img-${i}`)?.click()}>
                             <input type="file" id={`proj-img-${i}`} className="hidden" accept="image/*" onChange={(e) => updateProjectImage(e, i)} />
                             {proj.image ? <img src={proj.image} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center"><Plus size={24} className="text-gray-500 mb-1" /><span className="text-xs text-gray-500">Project Image</span></div>}
                           </div>
                         </div>
                         <input type="text" value={proj.title} onChange={e => updateProject(i, 'title', e.target.value)} className="w-full bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Project Title" />
                         <input type="text" value={proj.type} onChange={e => updateProject(i, 'type', e.target.value)} className="w-full bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Type (e.g. WEB, APP)" />
                         <textarea value={proj.description} onChange={e => updateProject(i, 'description', e.target.value)} className="w-full bg-primary-dark border border-white/10 p-2 text-sm text-white resize-none" placeholder="Description" rows={2} />
                         <input type="text" value={(proj.tags || []).join(', ')} onChange={e => updateProject(i, 'tags', e.target.value.split(',').map((t: string) => t.trim()))} className="w-full bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Tags (comma separated)" />
                         <div className="flex gap-2">
                           <input type="text" value={proj.codeLink || ''} onChange={e => updateProject(i, 'codeLink', e.target.value)} className="w-1/2 bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Code URL" />
                           <input type="text" value={proj.liveLink || ''} onChange={e => updateProject(i, 'liveLink', e.target.value)} className="w-1/2 bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Live Demo URL" />
                         </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <label className="block text-sm font-medium text-white">Custom My Projects (HTML/Code UI)</label>
                    <p className="text-gray-400 text-xs mb-2">Design any custom layouts directly using HTML (Tailwind is loaded globally).</p>
                    <textarea 
                      value={settings.featured_html || ''}
                      onChange={(e) => handleSettingChange('featured_html', e.target.value)}
                      placeholder="<div className='flex gap-4'><h1>My Custom Code</h1></div>"
                      className="w-full h-[400px] bg-[#0d1117] border border-white/10 rounded-xl p-4 text-green-400 focus:outline-none focus:border-accent-blue font-mono text-sm resize-none whitespace-pre shadow-inner leading-relaxed overflow-auto block" 
                    />
                    <p className="text-xs text-gray-500">If left empty, the standard My Projects GUI configurations (above) will be shown.</p>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex bg-black/20 rounded-xl p-1 mb-6 border border-white/5">
                    <button 
                      onClick={() => {
                        setActiveProductTab('add');
                        setEditingProduct({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '', content: '' });
                        setEditingProductIdx(null);
                      }} 
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeProductTab === 'add' ? 'bg-[#2563eb] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      Add/Edit Product
                    </button>
                    <button 
                      onClick={() => setActiveProductTab('manage')} 
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-colors ${activeProductTab === 'manage' ? 'bg-[#333333] text-white shadow-lg border border-white/10' : 'text-gray-400 hover:text-white'}`}
                    >
                      Manage Products
                    </button>
                  </div>
                  
                  {activeProductTab === 'add' && (
                    <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6 space-y-4 shadow-xl">
                      <h3 className="text-2xl font-black text-white mb-6 font-heading tracking-tight">{editingProductIdx !== null ? 'Edit Product' : 'Add Product'}</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                        <div 
                           className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white cursor-pointer hover:border-accent-blue transition-colors flex items-center justify-between"
                           onClick={() => setShowGalleryPicker({ active: true, onSelect: (url) => { setEditingProduct({ ...editingProduct, image: url }); setShowGalleryPicker({ active: false, onSelect: () => {} }); } })}
                        >
                           <span className="truncate">{editingProduct.image || 'Click to select from gallery...'}</span>
                           <Camera size={16} className="text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                        <input type="text" value={editingProduct.title} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Birthday Surprise Demo 4" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                        <input type="text" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="e.g. Free, $10, Contact for Price" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Dedicated Page Content (Markdown/HTML supported)</label>
                        <textarea value={editingProduct.content || ''} onChange={e => setEditingProduct({...editingProduct, content: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors h-64 resize-none font-mono" placeholder="Write full details about this service/product for its dedicated webpage. You can use Markdown or HTML..." />
                        <p className="text-xs text-gray-500 mt-1">If this is provided, a dedicated webpage for this service will be available.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Short Description</label>
                        <textarea value={editingProduct.desc} onChange={e => setEditingProduct({...editingProduct, desc: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none" placeholder="Description of the product" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Download Link (URL)</label>
                        <input type="text" value={editingProduct.link} onChange={e => setEditingProduct({...editingProduct, link: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="https://" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Live Preview Link (URL) - Optional</label>
                        <input type="text" value={editingProduct.liveLink} onChange={e => setEditingProduct({...editingProduct, liveLink: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="https://" />
                      </div>
                      
                      <button 
                        onClick={() => {
                           let current = [];
                           try { current = JSON.parse(settings.services || '[]'); } catch(e){}
                           const newProduct = { title: editingProduct.title, image: editingProduct.image, price: editingProduct.price, link: editingProduct.link, liveLink: editingProduct.liveLink, desc: editingProduct.desc, content: editingProduct.content };
                           if (editingProductIdx !== null) {
                             current[editingProductIdx] = newProduct;
                           } else {
                             current.push(newProduct);
                           }
                           handleSettingChange('services', JSON.stringify(current));
                           setEditingProduct({ title: '', image: '', price: 'Free', desc: '', link: '', liveLink: '', content: '' });
                           setEditingProductIdx(null);
                           setActiveProductTab('manage');
                        }}
                        className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4 active:scale-95"
                      >
                        Save Product
                      </button>
                    </div>
                  )}

                  {activeProductTab === 'manage' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(JSON.parse(settings.services || '[]')).map((srv: any, i: number) => (
                        <div key={i} className="bg-secondary-dark p-4 rounded-xl border border-white/10 relative group">
                           <div className="flex items-center gap-4">
                             <img src={srv.image || 'https://via.placeholder.com/150'} className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                             <div className="flex-1 overflow-hidden">
                               <h4 className="font-bold text-white text-lg truncate">{srv.title}</h4>
                               <p className="text-accent-blue text-sm font-semibold mt-1">{srv.price}</p>
                               <div className="flex gap-2 mt-3">
                                 <button onClick={() => {
                                   setEditingProduct({ title: srv.title || '', image: srv.image || '', price: srv.price || 'Free', link: srv.link || '', liveLink: srv.liveLink || '', desc: srv.desc || '', content: srv.content || '' });
                                   setEditingProductIdx(i);
                                   setActiveProductTab('add');
                                 }} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors">Edit</button>
                                 <button onClick={() => removeService(i)} className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 py-1.5 rounded text-xs font-medium transition-colors">Delete</button>
                               </div>
                             </div>
                           </div>
                        </div>
                      ))}
                      {(JSON.parse(settings.services || '[]')).length === 0 && (
                         <div className="col-span-full p-8 text-center text-gray-500 bg-black/20 rounded-xl border border-white/5">No products added yet.</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-white">Gallery Images</label>
                    <button onClick={() => document.getElementById('gallery-upload')?.click()} className="bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
                      <Plus size={16} /> Add Image
                    </button>
                    <input type="file" id="gallery-upload" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery', true)} />
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                     {(JSON.parse(settings.gallery || '[]')).map((img: any, i: number) => (
                       <div key={i} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video">
                          <img src={img.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                             <button onClick={() => removeGalleryImage(i)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transform hover:scale-110 transition-all"><Trash size={16} /></button>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {activeTab === 'users' && !selectedUser && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Registered Users Database</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.length === 0 ? (
                      <div className="col-span-full p-12 text-center text-gray-500 bg-secondary-dark rounded-xl border border-white/5 text-lg">
                        No users have registered yet.
                      </div>
                    ) : users.map(user => (
                      <div key={user.id} onClick={() => setSelectedUser(user)} className="bg-secondary-dark p-6 rounded-2xl border border-white/10 hover:border-accent-blue/50 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl group">
                        <div className="flex items-center gap-4 mb-4">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-accent-blue transition-colors" />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center font-bold text-2xl border-2 border-transparent group-hover:border-accent-blue transition-colors">
                              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 overflow-hidden">
                            <h4 className="font-bold text-lg text-white truncate">{user.name}</h4>
                            <span className="text-xs font-bold px-2.5 py-1 bg-accent-blue/10 text-accent-blue rounded-lg inline-block mt-1">{user.branch}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 space-y-2 mt-4 pt-4 border-t border-white/5">
                          <p className="flex items-center gap-2 truncate"><strong className="text-gray-300">Email:</strong> {user.email}</p>
                          <p className="flex items-center gap-2 truncate"><strong className="text-gray-300">Address:</strong> {user.address}</p>
                          <p className="text-xs text-gray-500 mt-2">Registered: {new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'users' && selectedUser && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setSelectedUser(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                      </button>
                      <div className="flex items-center gap-4">
                        {selectedUser.photoURL ? (
                          <img src={selectedUser.photoURL} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center font-bold text-xl">
                            {(selectedUser.name || selectedUser.email || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="text-2xl font-bold text-white leading-tight">{selectedUser.name}</h3>
                          <p className="text-accent-blue font-medium text-sm">{selectedUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={async () => {
                          const res = await deleteUser(selectedUser.id);
                          if (res.success) {
                            setUsers(users.filter(u => u.id !== selectedUser.id));
                            setSelectedUser(null);
                          }
                      }}
                      className="bg-red-500/10 hover:bg-red-500/20 active:scale-95 text-red-400 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-red-500/20"
                    >
                      <Trash size={16} /> Delete Data
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                     <div className="bg-secondary-dark p-6 rounded-2xl border border-white/10">
                        <span className="text-gray-500 block text-sm font-semibold uppercase mb-1">Branch/Role</span>
                        <span className="text-white font-medium text-lg">{selectedUser.branch}</span>
                     </div>
                     <div className="bg-secondary-dark p-6 rounded-2xl border border-white/10">
                        <span className="text-gray-500 block text-sm font-semibold uppercase mb-1">Address</span>
                        <span className="text-white font-medium text-lg">{selectedUser.address}</span>
                     </div>
                     <div className="bg-secondary-dark p-6 rounded-2xl border border-white/10">
                        <span className="text-gray-500 block text-sm font-semibold uppercase mb-1">Total Activities</span>
                        <span className="text-white font-medium text-lg">{sessions.filter(s => s.username === selectedUser.email || s.username === selectedUser.uid).length} events</span>
                     </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-4">Activity Timeline</h4>
                  <div className="bg-secondary-dark rounded-2xl border border-white/10 p-2">
                    <ul className="space-y-2 p-4">
                      {sessions
                        .filter(s => s.username === selectedUser.email || s.username === selectedUser.uid)
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((s, idx) => (
                           <li key={idx} className="flex gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-3 h-3 rounded-full bg-accent-blue ring-4 ring-accent-blue/20"></div>
                              </div>
                              <div>
                                <p className="text-white font-medium">{s.action}</p>
                                <p className="text-xs text-gray-500 mt-1">{new Date(s.timestamp).toLocaleString()}</p>
                              </div>
                           </li>
                        ))}
                      {sessions.filter(s => s.username === selectedUser.email || s.username === selectedUser.uid).length === 0 && (
                        <li className="text-gray-500 p-4 text-center">No recent activity found for this user.</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">User Login Analytics</h3>
                  <div className="bg-secondary-dark rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-400">
                      <thead className="bg-white/5 text-white/80 uppercase text-xs">
                        <tr>
                          <th className="px-6 py-4 font-semibold">User Identifier</th>
                          <th className="px-6 py-4 font-semibold">Action</th>
                          <th className="px-6 py-4 font-semibold">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sessions.length === 0 ? (
                           <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No user data available.</td></tr>
                        ) : sessions.map((s: any) => (
                          <tr key={s.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{s.username}</td>
                            <td className="px-6 py-4">
                               <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${s.action === 'LOGIN' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                 {s.action}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-xs">{new Date(s.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'traffic' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-bold text-white">Daily Web Traffic</h3>
                    <div className="bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-xl border border-accent-blue/20 font-bold">
                       Total Views: {pageViewsData.total.toLocaleString()}
                    </div>
                  </div>
                  
                  {pageViewsData.views.length > 0 ? (
                    <div className="w-full h-[300px] bg-secondary-dark border border-white/10 rounded-2xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...pageViewsData.views].reverse()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                          <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            cursor={{ fill: '#ffffff0a' }}
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '12px' }}
                            itemStyle={{ color: '#38bdf8', fontWeight: 'bold' }}
                          />
                          <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : null}

                  <div className="bg-secondary-dark rounded-xl border border-white/10 overflow-hidden mt-4">
                    <table className="w-full text-left text-sm text-gray-400">
                      <thead className="bg-white/5 text-white/80 uppercase text-xs">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Date</th>
                          <th className="px-6 py-4 font-semibold">Page Views</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {pageViewsData.views.length === 0 ? (
                           <tr><td colSpan={2} className="px-6 py-8 text-center text-gray-500">No traffic data available yet.</td></tr>
                        ) : pageViewsData.views.map((v: any, idx: number) => (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{v.date}</td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-3">
                                 <span className="font-bold text-accent-blue">{v.count.toLocaleString()}</span>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'feedbacks' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">User Feedbacks</h3>
                  {feedbacks.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 bg-secondary-dark rounded-xl border border-white/5">
                      No feedbacks received yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.map((fb: any) => (
                        <div key={fb.id} className="bg-secondary-dark p-5 rounded-xl border border-white/5">
                          <div className="flex justify-between items-start mb-2 text-sm text-gray-400">
                            <div>
                              <strong className="text-white">{fb.name}</strong> 
                              {fb.email && <span className="text-accent-blue ml-2">({fb.email})</span>}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs">{new Date(fb.created_at).toLocaleString()}</span>
                              <button 
                                onClick={async () => {
                                  const res = await deleteFeedback(fb.id);
                                  if (res.success) {
                                    setFeedbacks(feedbacks.filter(f => f.id !== fb.id));
                                  }
                                }}
                                className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors active:scale-90"
                                title="Delete Feedback"
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          </div>
                          <p className="text-white bg-black/20 p-4 rounded-lg mt-3">{fb.feedback}</p>
                          {fb.image_url && <img src={fb.image_url} alt="Feedback" className="mt-4 max-h-64 rounded-xl border border-white/10" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Footer actions when authenticated */}
        {isAuthenticated && activeTab !== 'feedbacks' && activeTab !== 'analytics' && (
          <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
            {error && <span className="text-sm font-medium text-red-400 self-center mr-4">{error}</span>}
            <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95">
              <Save size={18} />
              Save All Changes
            </button>
          </div>
        )}
      </div>

      {/* Gallery Picker Modal */}
      {showGalleryPicker.active && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              <h3 className="text-white font-bold font-heading">Select Image from Gallery</h3>
              <button onClick={() => setShowGalleryPicker({ active: false, onSelect: () => {} })} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {(JSON.parse(settings.gallery || '[]')).length === 0 ? (
                <div className="text-center text-gray-500 py-12">No images in gallery. Please add images from the Gallery tab first.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(JSON.parse(settings.gallery || '[]')).map((img: any, i: number) => (
                    <div 
                      key={i} 
                      onClick={() => showGalleryPicker.onSelect(img.url)}
                      className="relative rounded-xl overflow-hidden border border-white/10 aspect-square cursor-pointer hover:border-accent-blue hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group"
                    >
                      <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <span className="bg-accent-blue text-primary-dark text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">Select</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
