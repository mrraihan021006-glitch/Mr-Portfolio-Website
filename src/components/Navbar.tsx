import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Briefcase, User, Mail, Home, FileText } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Detection for Smooth Navbar Shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <User className="w-4 h-4" /> },
    { name: 'Portfolio', path: '/portfolio', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm' 
        : 'bg-transparent py-6 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Advanced Logo (Click Text = Home, Double Click Dot = Admin) */}
        <div className="flex items-baseline select-none">
          <span 
            onClick={() => navigate('/')} 
            className="text-3xl font-black tracking-tighter cursor-pointer text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Raihan
          </span>
          <span 
            onDoubleClick={(e) => { e.stopPropagation(); navigate('/admin/login'); }}
            className="text-3xl font-black text-blue-600 cursor-default"
            title="System Access"
          >
            .
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons (Dark Mode + Resume) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="hidden md:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-bold hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <FileText className="w-4 h-4" /> Resume
          </button>
        </div>

      </div>
    </nav>
  );
}
