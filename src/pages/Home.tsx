import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { ArrowRight, Code, PenTool, Zap, CheckCircle, ExternalLink } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState({ profile_image: '', stat_projects: '0', stat_clients: '0', stat_experience: '0' });
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchSiteData();
    fetchFeaturedProjects();
  }, []);

  const fetchSiteData = async () => {
    const { data } = await supabase.from('site_data').select('*').eq('id', 1).single();
    if (data) setSiteData(data);
  };

  const fetchFeaturedProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(3);
    if (data) setFeaturedProjects(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pb-20">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide shadow-sm">
            <CheckCircle className="w-4 h-4" /> Available for new projects
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital</span> <br /> Experiences.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed mx-auto md:mx-0">
            I seamlessly blend high-end graphic design with robust full-stack development to build business websites that convert.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => navigate('/portfolio')}
              className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore My Work <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition shadow-sm hover:shadow-md"
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2 border-4 border-white shadow-2xl bg-gradient-to-tr from-blue-100 to-indigo-50">
            {siteData.profile_image ? (
              <img src={siteData.profile_image} alt="Profile" className="w-full h-full object-cover rounded-full shadow-inner" />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full bg-slate-200 text-slate-400 font-medium">
                Add Photo in Admin
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Stats Section */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="pt-4 md:pt-0">
            <h3 className="text-4xl font-black text-slate-900 mb-2">{siteData.stat_projects}</h3>
            <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Projects Completed</p>
          </div>
          <div className="pt-4 md:pt-0">
            <h3 className="text-4xl font-black text-slate-900 mb-2">{siteData.stat_clients}</h3>
            <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Happy Clients</p>
          </div>
          <div className="pt-4 md:pt-0">
            <h3 className="text-4xl font-black text-slate-900 mb-2">{siteData.stat_experience}</h3>
            <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Demo Projects Showcase */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Featured Work</h2>
            <p className="text-slate-600 text-lg">Some of my recent digital products and templates.</p>
          </div>
          <button onClick={() => navigate('/portfolio')} className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition">
            View All Projects <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group">
              <div className="h-56 overflow-hidden bg-slate-100 relative">
                {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">{project.description}</p>
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition">
                  Live Preview <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Code className="w-7 h-7" /></div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Web Development</h3>
          <p className="text-slate-600 leading-relaxed">Custom React applications tailored perfectly for your business logic.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6"><PenTool className="w-7 h-7" /></div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">UI/UX & Branding</h3>
          <p className="text-slate-600 leading-relaxed">Professional visual identities and high-converting modern interfaces.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6"><Zap className="w-7 h-7" /></div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Workflow Automation</h3>
          <p className="text-slate-600 leading-relaxed">Custom scripts and tools designed to accelerate your operational workflows.</p>
        </div>
      </div>

    </div>
  );
}
