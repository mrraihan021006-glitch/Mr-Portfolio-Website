import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// About ও Portfolio পেজগুলোও একইভাবে ইমপোর্ট করে নেবে যখন বানাবে

function App() {
  return (
    <Router>
      <Routes>
        {/* অ্যাডমিন প্যানেলে নেভবার দেখাবো না, তাই রাউট আলাদা করা হলো */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        
        {/* পাবলিক পেজগুলোতে নেভবার থাকবে */}
        <Route path="*" element={
          <>
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                {/* <Route path="/about" element={<About />} /> */}
                {/* <Route path="/portfolio" element={<Portfolio />} /> */}
              </Routes>
            </main>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
