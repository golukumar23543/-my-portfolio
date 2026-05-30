import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { addSession, registerUser } from '../lib/api';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'terms'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [branch, setBranch] = useState('');
  const [error, setError] = useState('');

  const getFirebaseEmail = (input: string) => {
    if (/^[+\d]+$/.test(input) && !input.includes('@')) {
      return `${input}@phone.local`;
    }
    return input;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    try {
      setError('');
      const fbEmail = getFirebaseEmail(username);
      await signInWithEmailAndPassword(auth, fbEmail, password);
      await addSession({ username, action: 'LOGIN' });
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password auth is not enabled in your Firebase Project Console. Please enable it under Authentication -> Sign-in Method.');
      } else {
        setError(err.message || 'Login failed');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      const res = await signInWithPopup(auth, googleProvider);
      import('../lib/api').then(({ upsertUser }) => {
        upsertUser({
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.displayName || 'Google User',
          photoURL: res.user.photoURL,
          address: 'N/A',
          branch: 'General'
        });
      });
      await addSession({ username: res.user.email, action: 'GOOGLE_LOGIN' });
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password auth is not enabled in your Firebase Project Console. Please enable it under Authentication -> Sign-in Method.');
      } else if (err.code !== 'auth/cancelled-popup-request' && err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google Login failed');
      }
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !name || !address || !branch) {
      setError('Please fill all mandatory fields!');
      return;
    }
    try {
      setError('');
      const fbEmail = getFirebaseEmail(username);
      const creds = await createUserWithEmailAndPassword(auth, fbEmail, password);
      await registerUser({
        uid: creds.user.uid,
        email: username,
        name,
        address,
        branch
      });
      await addSession({ username, action: 'REGISTER' });
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password auth is not enabled in your Firebase Project Console. Please enable it under Authentication -> Sign-in Method.');
      } else {
        setError(err.message || 'Registration failed');
      }
    }
  };

  const handleForgot = (e: FormEvent) => {
    e.preventDefault();
    alert('Reset link sent!');
    onClose();
  };

  if (mode === 'terms') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-secondary-dark border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] p-8 relative shadow-2xl flex flex-col">
          <button onClick={() => setMode('register')} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold font-heading mb-6 text-white border-b border-white/10 pb-4">Terms and Conditions</h2>
          <div className="flex-1 overflow-y-auto pr-4 text-gray-300 text-sm space-y-6">
            <section>
              <h3 className="text-lg font-bold text-white mb-2">1. Introduction</h3>
              <p>Welcome to Mr. Golu's Portfolio platform. By accessing or using this website, you agree to be bound by these Terms and Conditions and our Privacy Policy. This agreement outlines the rules and regulations for the use of our services.</p>
              <p className="mt-2">These terms apply to all visitors, users, and others who access or use the Service. If you disagree with any part of the terms then you may not access the Service.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold text-white mb-2">2. Data Privacy and User Profiles</h3>
              <p>When you create an account, you provide us with personal information such as your name, email, physical address, and branch designation. Your data is stored securely in our database. We use this data to provide a personalized experience and improve our services.</p>
              <p className="mt-2"><strong>Data Storage:</strong> All provided user data (including Address) will be stored on this site. Please be aware that this data is visible in the site's admin databases for analytics and user management.</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-2">3. User Responsibilities</h3>
              <p>Users are responsible for safeguarding the password that they use to access the Service and for any activities or actions under their password, whether their password is with our Service or a third-party service.</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>You must provide accurate, complete, and current information.</li>
                <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-2">4. Disclaimers and Limitations of Liability</h3>
              <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The platform makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content or materials included therein.</p>
              <p>We shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
             <button onClick={() => setMode('register')} className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2 rounded-lg transition-colors">
               Back to Registration
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-secondary-dark border border-white/10 rounded-2xl w-full max-w-md p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold font-heading mb-6 text-white text-center">
          {mode === 'login' && 'Welcome Back'}
          {mode === 'register' && 'Create Your Profile'}
          {mode === 'forgot' && 'Reset Password'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={mode === 'login' ? handleLogin : mode === 'register' ? handleRegister : handleForgot}>
          
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors" placeholder="e.g. Suraj Arya" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Branch / Designation *</label>
                <select value={branch} onChange={(e) => setBranch(e.target.value)} required className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors appearance-none">
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE (Computer Science)</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Electrical">Electrical Engineering</option>
                  <option value="Other">Other / Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Address *</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Your full address" rows={2} className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors resize-none" />
              </div>
            </>
          )}

          {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email or Phone Number *</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors" 
                placeholder="Enter email or phone number" 
              />
            </div>
          )}
          
          {(mode === 'login' || mode === 'register') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password *</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors pr-12" 
                  placeholder="Enter password" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white bg-transparent">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" required id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-xs text-gray-400">
                I agree to the <button type="button" onClick={() => setMode('terms')} className="text-accent-blue hover:underline">Terms and Conditions</button>. I understand my data and profile will be stored on this site's database.
              </label>
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => setMode('forgot')} className="text-sm text-accent-blue hover:underline">Forgot Password?</button>
            </div>
          )}

          <button type="submit" className="w-full bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold py-3.5 rounded-xl transition-all mt-4">
            {mode === 'login' && 'Login'}
            {mode === 'register' && 'Register Profile'}
            {mode === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        {(mode === 'login' || mode === 'register') && (
          <>
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <button 
              onClick={handleGoogleLogin} 
              className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </>
        )}

        <div className="mt-6 text-center text-sm text-gray-400 border-t border-white/5 pt-4">
          {mode === 'login' ? (
            <p>Don't have a profile? <button onClick={() => setMode('register')} className="text-accent-blue hover:underline font-semibold">Create one here</button></p>
          ) : (
            <p>Back to <button onClick={() => setMode('login')} className="text-accent-blue hover:underline font-semibold">Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
