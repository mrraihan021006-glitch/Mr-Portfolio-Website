import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login'); // Not logged in? Kick them out
      } else {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <div className="text-center mt-20">Loading Admin Area...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Control Center</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-400">Dashboard</li>
          <li className="cursor-pointer hover:text-blue-400">Manage Portfolio</li>
          <li className="cursor-pointer hover:text-blue-400">Messages</li>
        </ul>
        <button 
          onClick={handleLogout}
          className="mt-auto absolute bottom-6 text-red-400 hover:text-red-300 font-bold"
        >
          Logout Session
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
        <div className="grid grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-500 font-medium">Total Messages</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-500 font-medium">Live Projects</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
