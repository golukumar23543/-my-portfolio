import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    if (mode === 'login' || mode === 'register') {
      fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          action: mode === 'register' ? 'REGISTER' : 'LOGIN'
        })
      }).then(() => {
        alert(mode === 'register' ? 'Registration Successful!' : 'Login Successful!');
        onClose();
      }).catch(err => console.error(err));
    } else {
      alert('Reset link sent!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-secondary-dark border border-white/10 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold font-heading mb-6 text-white text-center">
          {mode === 'login' && 'Welcome Back'}
          {mode === 'register' && 'Create Account'}
          {mode === 'forgot' && 'Reset Password'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {(mode === 'login' || mode === 'register') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email or Phone Number</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors" 
                placeholder="Enter email or phone" 
              />
            </div>
          )}
          
          {mode === 'forgot' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email or Phone Number</label>
              <input type="text" className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors" placeholder="Enter email or phone to reset" />
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-primary-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors pr-12" 
                  placeholder="Enter password" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => setMode('forgot')} className="text-sm text-accent-blue hover:underline">Forgot Password?</button>
            </div>
          )}

          <button className="w-full bg-accent-blue hover:bg-accent-blue-hover text-primary-dark font-bold py-3.5 rounded-xl transition-all mt-4">
            {mode === 'login' && 'Login'}
            {mode === 'register' && 'Register'}
            {mode === 'forgot' && 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {mode === 'login' ? (
            <p>Don't have an account? <button onClick={() => setMode('register')} className="text-accent-blue hover:underline font-semibold">Register here</button></p>
          ) : (
            <p>Back to <button onClick={() => setMode('login')} className="text-accent-blue hover:underline font-semibold">Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
