import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo with Hidden Admin Trick */}
        <div 
          onDoubleClick={() => navigate('/admin/login')} 
          className="cursor-pointer select-none"
          title="MyPortfolio"
        >
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Raihan.
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/portfolio" className="hover:text-blue-600 transition">Portfolio</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
