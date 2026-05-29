import { useState, useEffect, type FormEvent } from 'react';
import { X, Save, MessageSquare, Settings, Image as ImageIcon, Briefcase, Users, Layers, Camera, Plus, Trash } from 'lucide-react';

export default function AdminModal({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('settings');

  const [settings, setSettings] = useState<any>({
    profile_image: '',
    featured_work: '[]',
    featured_html: '',
    services: '[]',
    gallery: '[]'
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
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
      if (activeTab === 'feedbacks') {
        fetch('/api/feedbacks')
          .then(res => res.json())
          .then(data => setFeedbacks(data))
          .catch(err => console.error(err));
      } else if (activeTab === 'analytics') {
        fetch('/api/sessions')
          .then(res => res.json())
          .then(data => setSessions(data))
          .catch(err => console.error(err));
      }
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'Virus@93') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleSave = () => {
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        settings
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.reload();
      } else {
        setError(data.error || 'Failed to save');
      }
    })
    .catch(err => setError('Error saving settings'));
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
      <div className="bg-secondary-dark border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
          <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Settings size={20} className="text-accent-blue" />
            Admin Dashboard
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
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
                <button className="w-full bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-accent-blue/20">
                  Authenticate required
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 bg-black/10 p-4 space-y-2 overflow-y-auto">
              <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <ImageIcon size={18} /> Profile Image
              </button>
              <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Briefcase size={18} /> Featured Work
              </button>
              <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'services' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Layers size={18} /> Services
              </button>
              <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'gallery' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Camera size={18} /> Gallery
              </button>
              <div className="h-px bg-white/10 my-4"></div>
              <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Users size={18} /> User Analytics
              </button>
              <button onClick={() => setActiveTab('feedbacks')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'feedbacks' ? 'bg-accent-blue text-primary-dark' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
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

              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white">Custom Featured Work (HTML/Code UI)</label>
                  <p className="text-gray-400 text-xs mb-2">Design any custom layouts directly using HTML (Tailwind is loaded globally).</p>
                  <textarea 
                    value={settings.featured_html || ''}
                    onChange={(e) => handleSettingChange('featured_html', e.target.value)}
                    placeholder="<div className='flex gap-4'><h1>My Custom Code</h1></div>"
                    className="w-full h-[400px] bg-[#0d1117] border border-white/10 rounded-xl p-4 text-green-400 focus:outline-none focus:border-accent-blue font-mono text-sm resize-none whitespace-pre shadow-inner leading-relaxed overflow-auto block" 
                  />
                  <p className="text-xs text-gray-500">If left empty, the default UI configuration for featured products will be shown.</p>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-white">Manage Services & Products</label>
                    <button onClick={handleServiceAdd} className="bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
                      <Plus size={16} /> Add Service
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(JSON.parse(settings.services || '[]')).map((srv: any, i: number) => (
                      <div key={i} className="bg-secondary-dark p-4 rounded-xl border border-white/10 relative">
                         <button onClick={() => removeService(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 z-10 bg-black/50 p-1.5 rounded-full"><Trash size={16} /></button>
                         <div className="mb-4">
                           <div className="h-32 w-full bg-primary-dark border border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-accent-blue overflow-hidden relative" onClick={() => document.getElementById(`srv-img-${i}`)?.click()}>
                             <input type="file" id={`srv-img-${i}`} className="hidden" accept="image/*" onChange={(e) => updateServiceImage(e, i)} />
                             {srv.image ? <img src={srv.image} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center"><Plus size={24} className="text-gray-500 mb-1" /><span className="text-xs text-gray-500">Add Image</span></div>}
                           </div>
                         </div>
                         <input type="text" value={srv.title} onChange={e => updateService(i, 'title', e.target.value)} className="w-full bg-primary-dark border border-white/10 p-2 text-sm text-white mb-2" placeholder="Title / Service Name" />
                         <textarea value={srv.desc} onChange={e => updateService(i, 'desc', e.target.value)} className="w-full bg-primary-dark border border-white/10 p-2 text-sm text-white mb-2 resize-none" placeholder="Description" rows={2} />
                         <div className="flex gap-2">
                           <input type="text" value={srv.price} onChange={e => updateService(i, 'price', e.target.value)} className="w-1/2 bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Price (e.g. $50)" />
                           <input type="text" value={srv.link} onChange={e => updateService(i, 'link', e.target.value)} className="w-1/2 bg-primary-dark border border-white/10 p-2 text-sm text-white" placeholder="Buy/Contact Link" />
                         </div>
                      </div>
                    ))}
                  </div>
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
                            <span className="text-xs">{new Date(fb.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-white bg-black/20 p-4 rounded-lg mt-3">{fb.feedback}</p>
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
            <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-green-500/20">
              <Save size={18} />
              Save All Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
