import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, Phone } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <Info size={20} />
              <span>About</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <Phone size={20} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;