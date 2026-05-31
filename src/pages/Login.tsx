import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid credentials. Access denied.");
      setLoading(false);
    } else {
      // লগইন সফল হলে সরাসরি ড্যাশবোর্ডে নিয়ে যাবে
      navigate('/admin'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-[-10%] left-[-10%] pointer-events-none"></div>
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-[-10%] right-[-10%] pointer-events-none"></div>

      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-5 shadow-lg shadow-blue-500/30">
            <span className="text-2xl text-white">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-wide">Command Center</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <input 
              type="email" placeholder="Admin Email" required
              className="w-full bg-slate-900/50 border border-slate-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input 
              type="password" placeholder="Secure Password" required
              className="w-full bg-slate-900/50 border border-slate-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 transition"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/40 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Unlock Dashboard'}
          </button>
          
          {errorMsg && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
