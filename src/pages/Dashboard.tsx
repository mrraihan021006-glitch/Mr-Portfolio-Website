import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, PlusSquare, FolderKanban, LogOut, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Business', live_url: '', image_url: '' });
  const [siteData, setSiteData] = useState({ profile_image: '', stat_projects: '', stat_clients: '', stat_experience: '' });

  useEffect(() => {
    checkUser();
    fetchProjects();
    fetchSiteData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/admin/login');
    else setLoading(false);
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjectsList(data);
  };

  const fetchSiteData = async () => {
    const { data } = await supabase.from('site_data').select('*').eq('id', 1).single();
    if (data) setSiteData(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "raihan_metadata");
    data.append("cloud_name", "dbkmg0oia");
    const res = await fetch(`https://api.cloudinary.com/v1_1/dbkmg0oia/image/upload`, { method: "POST", body: data });
    return await res.json();
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    try {
      const uploadedImage = await uploadToCloudinary(e.target.files[0]);
      setFormData({ ...formData, image_url: uploadedImage.secure_url });
    } finally {
      setUploading(false);
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    try {
      const uploadedImage = await uploadToCloudinary(e.target.files[0]);
      setSiteData({ ...siteData, profile_image: uploadedImage.secure_url });
    } finally {
      setUploading(false);
    }
  };

  const submitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('projects').update(formData).eq('id', editingId);
      alert("Project Updated!");
    } else {
      await supabase.from('projects').insert([formData]);
      alert("Project Added!");
    }
    setFormData({ title: '', description: '', category: 'Business', live_url: '', image_url: '' });
    setEditingId(null);
    fetchProjects();
    setActiveTab('manage_projects');
  };

  const deleteProject = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  const editProject = (project: any) => {
    setFormData(project);
    setEditingId(project.id);
    setActiveTab('project_form');
  };

  const saveSiteData = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('site_data').update(siteData).eq('id', 1);
    alert("Home Page Data Updated!");
  };

  if (loading) return <div className="text-center mt-20 font-bold text-xl">Loading System...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 relative flex flex-col">
        <h2 className="text-2xl font-black mb-10 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Admin Panel</h2>
        <ul className="space-y-2 font-medium flex-1">
          <li onClick={() => setActiveTab('dashboard')} className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </li>
          <li onClick={() => setActiveTab('site_settings')} className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'site_settings' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Settings className="w-5 h-5" /> Home Page Setup
          </li>
          <li onClick={() => { setActiveTab('project_form'); setEditingId(null); setFormData({ title: '', description: '', category: 'Business', live_url: '', image_url: '' }); }} className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'project_form' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <PlusSquare className="w-5 h-5" /> Add Project
          </li>
          <li onClick={() => setActiveTab('manage_projects')} className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'manage_projects' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <FolderKanban className="w-5 h-5" /> Manage Portfolio
          </li>
        </ul>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 mt-auto p-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg font-bold transition">
          <LogOut className="w-5 h-5" /> Terminate Session
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-black mb-8 text-slate-900">System Overview</h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-slate-500 font-semibold mb-2">Total Projects</h3>
                <p className="text-4xl font-black text-slate-900">{projectsList.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'site_settings' && (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black mb-8 text-slate-900">Home Page Controls</h1>
            <form onSubmit={saveSiteData} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2 text-slate-700">Profile Photo</label>
                <div className="flex items-center gap-6">
                  {siteData.profile_image ? (
                    <img src={siteData.profile_image} alt="Profile" className="w-20 h-20 rounded-full object-cover border shadow" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border"><ImageIcon className="w-8 h-8 text-slate-400" /></div>
                  )}
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">Projects Completed Stat</label>
                  <input type="text" value={siteData.stat_projects} onChange={e => setSiteData({...siteData, stat_projects: e.target.value})} className="w-full border p-3 rounded-xl focus:outline-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">Happy Clients Stat</label>
                  <input type="text" value={siteData.stat_clients} onChange={e => setSiteData({...siteData, stat_clients: e.target.value})} className="w-full border p-3 rounded-xl focus:outline-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700">Years Experience Stat</label>
                  <input type="text" value={siteData.stat_experience} onChange={e => setSiteData({...siteData, stat_experience: e.target.value})} className="w-full border p-3 rounded-xl focus:outline-blue-500" />
                </div>
              </div>
              <button disabled={uploading} type="submit" className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition">
                {uploading ? 'Uploading Image...' : 'Save Settings'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'project_form' && (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black mb-8 text-slate-900">{editingId ? 'Edit Project' : 'Add New Project'}</h1>
            <form onSubmit={submitProject} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-slate-700">Project Title</label>
                <input type="text" required className="w-full border p-3 rounded-xl focus:outline-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2 text-slate-700">Description</label>
                <textarea required rows={3} className="w-full border p-3 rounded-xl focus:outline-blue-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2 text-slate-700">Category</label>
                  <select className="w-full border p-3 rounded-xl focus:outline-blue-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Business">Business</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Real Estate">Real Estate</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-2 text-slate-700">Live URL</label>
                  <input type="url" required className="w-full border p-3 rounded-xl focus:outline-blue-500" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} />
                </div>
              </div>
              <div className="mb-8 border-t pt-6">
                <label className="block text-sm font-bold mb-2 text-slate-700">Project Thumbnail</label>
                <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer mb-4" />
                {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-32 object-cover rounded-xl border shadow-sm" />}
              </div>
              <button disabled={uploading} type="submit" className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition">
                {uploading ? 'Processing...' : (editingId ? 'Update Project' : 'Publish Project')}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'manage_projects' && (
          <div>
            <h1 className="text-3xl font-black mb-8 text-slate-900">Manage Portfolio</h1>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold text-sm border-b">
                  <tr>
                    <th className="p-4">Project Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projectsList.map(project => (
                    <tr key={project.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 flex items-center gap-4">
                        {project.image_url ? (
                          <img src={project.image_url} className="w-16 h-12 rounded object-cover border" alt="" />
                        ) : (
                          <div className="w-16 h-12 rounded bg-slate-100 flex items-center justify-center border"><ImageIcon className="w-4 h-4 text-slate-400" /></div>
                        )}
                        <span className="font-bold text-slate-900">{project.title}</span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{project.category}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => editProject(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition mr-2">
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button onClick={() => deleteProject(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {projectsList.length === 0 && (
                    <tr><td colSpan={3} className="p-8 text-center text-slate-500">No projects found. Add some from the Add Project tab.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
