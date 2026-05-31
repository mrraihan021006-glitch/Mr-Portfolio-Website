import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  live_url: string;
  category: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Restaurant', 'Business', 'Ecommerce', 'Real Estate'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setProjects(data);
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">My Work</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-medium transition ${
              filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border overflow-hidden group">
            <div className="h-48 overflow-hidden bg-gray-200">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{project.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              <a 
                href={project.live_url} target="_blank" rel="noopener noreferrer"
                className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                View Live Demo
              </a>
            </div>
          </div>
        ))}
        
        {filteredProjects.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-10">No projects found in this category yet.</p>
        )}
      </div>
    </div>
  );
}
