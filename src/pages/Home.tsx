import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[90vh]">
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            I Build <span className="text-blue-600">High-Converting</span> <br /> Business Websites
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Transforming ideas into digital reality with modern design and powerful technology.
          </p>
          <button 
            onClick={() => navigate('/portfolio')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            View My Work
          </button>
        </div>
      </div>

      {/* Hidden Admin Trigger (Double Click on Footer) */}
      <footer className="py-6 text-center text-gray-400 text-sm">
        <span 
          onDoubleClick={() => navigate('/admin/login')} 
          className="cursor-default select-none"
          title="Double click me"
        >
          © 2026 MyPortfolio. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}
