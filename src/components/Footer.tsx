import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-stone-100 text-stone-800 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-8 text-center md:text-left items-center md:items-start">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">OVO</h3>
            <p className="text-stone-600 max-w-xs mx-auto md:mx-0">
              Elegance redefined through timeless fashion and contemporary style.
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-stone-700">
              <li><a href="/" className="hover:text-stone-900 transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-stone-900 transition-colors">Products</a></li>
              <li><a href="/cart" className="hover:text-stone-900 transition-colors">Cart</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <a
              href="https://wa.me/201092940685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 text-stone-700 hover:text-green-600 transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-stone-300 mt-8 pt-6 flex flex-col items-center">
          <div className="flex items-center gap-2 justify-center">
            <p className="text-stone-500 text-center text-sm md:text-base">© 2025 OVO. All rights reserved.</p>
            <button
              onClick={() => navigate('/admin-login')}
              className="text-stone-500 hover:text-stone-800 transition-colors"
              title="Admin Login"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
