import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* অ্যাডমিন প্যানেল ও লগইন (এখানে নেভবার থাকবে না) */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        
        {/* পাবলিক পেজগুলো (যেগুলোতে নেভবার থাকবে) */}
        <Route path="*" element={
          <>
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
