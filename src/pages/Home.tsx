import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide shadow-sm">
          🚀 Available for new projects
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight">
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital</span> <br /> Experiences.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          I seamlessly blend high-end graphic design with robust full-stack development to build business websites that convert. From aesthetics to backend logic, I deliver complete solutions.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/portfolio')}
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore My Work
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition shadow-sm hover:shadow-md"
          >
            Let's Talk
          </button>
        </div>
      </div>

      {/* Services Preview Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">💻</div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Web Development</h3>
          <p className="text-slate-600 leading-relaxed">Custom React & Supabase applications tailored perfectly for your business logic.</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">🎨</div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">UI/UX & Branding</h3>
          <p className="text-slate-600 leading-relaxed">Professional visual identities, logos, and high-converting modern interfaces.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">⚙️</div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Workflow Automation</h3>
          <p className="text-slate-600 leading-relaxed">Custom scripts and browser tools designed to accelerate your operational workflows.</p>
        </div>
      </div>

    </div>
  );
}
