import { useState, useRef } from 'react';
import { X, Camera, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { motion } from 'motion/react';

export default function ProfileModal({ user, onClose, onUpdate }: { user: any, onClose: () => void, onUpdate?: (user: any) => void }) {
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 256; // Smaller size for profile
          let width = img.width;
          let height = img.height;
          
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
          setPhotoURL(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = evt.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData: any = { displayName };
      // Only set photoURL in FirebaseAuth if it's not a long data URL
      if (photoURL && !photoURL.startsWith('data:')) {
        updateData.photoURL = photoURL;
      }

      await updateProfile(auth.currentUser!, updateData);
      
      // Import upsertUser to sync profile data with firestore
      const { upsertUser } = await import('../lib/api');
      await upsertUser({
        email: user?.email,
        name: displayName,
        photoURL: photoURL,
        uid: user?.uid
      });

      if (onUpdate) onUpdate(auth.currentUser);

      alert('Profile updated successfully!');
      onClose();
    } catch (error: any) {
      console.error(error);
      alert('Failed to update profile: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-secondary-dark border border-white/10 rounded-2xl w-full max-w-sm p-8 relative shadow-2xl flex flex-col items-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white active:scale-95">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold font-heading mb-6 text-white text-center border-b border-white/10 w-full pb-4">
          Upgrade Profile
        </h2>

        {/* Avatar Setup */}
        <div className="relative mb-6">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 rounded-full border-2 border-accent-blue overflow-hidden bg-primary-dark flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            {photoURL ? (
              <motion.img 
                key={photoURL}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={photoURL} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-3xl font-bold text-gray-400">{displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
            )}
          </motion.div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent-blue text-primary-dark flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <Camera size={16} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
        </div>

        <div className="w-full space-y-4 mb-8">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Email (Read Only)</label>
            <input type="text" disabled value={user?.email || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Display Name</label>
            <input 
              type="text" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-blue focus:outline-none transition-colors" 
            />
          </div>
        </div>

        <div className="w-full flex gap-3">
          <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-semibold active:scale-95">
            <LogOut size={18} /> Logout
          </button>
          <button onClick={handleSave} disabled={saving} className="flex-[2] bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
