import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/admin'); // Success: Go to Dashboard
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Access</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" placeholder="Admin Email" required
            className="w-full border p-3 rounded-lg mb-4"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full border p-3 rounded-lg mb-6"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-bold">
            Login to Dashboard
          </button>
          {errorMsg && <p className="text-red-500 text-sm mt-3 text-center">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}
