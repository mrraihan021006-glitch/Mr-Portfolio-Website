export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-bold mb-4">Hi, I'm Mohammad Raihan</h2>
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          I am a professional graphic designer and full-stack developer. I specialize in building high-converting business websites, custom web applications, and visually stunning digital products. Through my design service brand, Smoothly, and my multi-category brand, Noorish, I have honed my ability to merge aesthetics with robust technology to deliver complete solutions for clients.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Supabase', 'Cloudinary', 'UI/UX Design', 'WordPress', 'Elementor'].map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-800 border px-4 py-2 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Tools & Workflow</h3>
            <ul className="space-y-2 text-gray-600 font-medium">
              <li>⚡ Frontend: React (Vite), Tailwind CSS</li>
              <li>🗄️ Backend: Supabase (PostgreSQL, Auth)</li>
              <li>☁️ Media & Storage: Cloudinary, Cloudflare R2</li>
              <li>🎨 Design: Professional Graphic Design Tools</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
