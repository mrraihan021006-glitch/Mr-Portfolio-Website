import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">MyPortfolio.</Link>
        <div className="space-x-6 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          <Link to="/portfolio" className="hover:text-blue-600 transition">Portfolio</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
