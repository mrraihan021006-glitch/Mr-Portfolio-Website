import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Business', live_url: '', image_url: ''
  });

  useEffect(() => {
    // লগইন চেক করা
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login'); 
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

  // Cloudinary Image Upload Logic
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "raihan_metadata"); // তোমার Upload Preset
    data.append("cloud_name", "dbkmg0oia");          // তোমার Cloud Name

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dbkmg0oia/image/upload`, {
        method: "POST",
        body: data
      });
      const uploadedImage = await res.json();
      setFormData({ ...formData, image_url: uploadedImage.secure_url });
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed! Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Supabase Database Insert Logic
  const submitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      alert("Please upload an image first!");
      return;
    }

    const { error } = await supabase.from('projects').insert([formData]);
    
    if (!error) {
      alert("Project Added Successfully!");
      setFormData({ title: '', description: '', category: 'Business', live_url: '', image_url: '' }); // Form Reset
    } else {
      alert("Error adding project: " + error.message);
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Admin Area...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 relative">
        <h2 className="text-2xl font-bold mb-8">Control Center</h2>
        <ul className="space-y-4 font-medium">
          <li 
            onClick={() => setActiveTab('dashboard')} 
            className={`cursor-pointer hover:text-blue-400 ${activeTab === 'dashboard' ? 'text-blue-400' : ''}`}
          >
            Dashboard
          </li>
          <li 
            onClick={() => setActiveTab('add_project')} 
            className={`cursor-pointer hover:text-blue-400 ${activeTab === 'add_project' ? 'text-blue-400' : ''}`}
          >
            Add New Project
          </li>
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
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-gray-500 font-medium">Messages Alert</h3>
                <p className="text-lg font-bold mt-2 text-gray-800">Check Supabase DB</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-gray-500 font-medium">System Status</h3>
                <p className="text-lg font-bold mt-2 text-green-600">All Systems Online</p>
              </div>
            </div>
          </>
        )}

        {/* Add Project Tab */}
        {activeTab === 'add_project' && (
          <>
            <h1 className="text-3xl font-bold mb-6">Manage Portfolio</h1>
            <form onSubmit={submitProject} className="bg-white p-8 rounded-xl border max-w-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Add New Project</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Project Title</label>
                <input type="text" required className="w-full border p-3 rounded-lg focus:outline-blue-500"
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
                
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                <textarea required rows={3} className="w-full border p-3 rounded-lg focus:outline-blue-500"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
                
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                  <select className="w-full border p-3 rounded-lg focus:outline-blue-500" 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Business">Business</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Live URL</label>
                  <input type="url" required placeholder="https://" className="w-full border p-3 rounded-lg focus:outline-blue-500"
                    value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Project Image (Cloudinary)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 w-full rounded-lg bg-gray-50 cursor-pointer" />
                
                {uploading && <p className="text-blue-600 text-sm mt-2 font-medium">Uploading image to Cloudinary...</p>}
                
                {formData.image_url && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600 font-medium mb-2">Image uploaded successfully!</p>
                    <img src={formData.image_url} alt="Preview" className="h-32 object-cover rounded-lg border shadow-sm" />
                  </div>
                )}
              </div>

              <button 
                disabled={uploading} 
                type="submit" 
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition disabled:bg-gray-400"
              >
                Save Project to Database
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
