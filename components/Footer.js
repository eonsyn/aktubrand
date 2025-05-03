import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-highlight">AKTU BRAND</h2>
          <p className="mt-4 text-gray-300">
            Your one-stop platform to access PDFs, Quantum books, and blogs to crack AKTU semester exams with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-blue-300">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/resources" className="hover:underline">Download PDFs</a></li>
            <li><a href="/blogs" className="hover:underline">Important Blogs</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-blue-300">Follow Us</h3>
          <div className="flex gap-4 text-gray-300 text-xl">
            <a href="#"><FaFacebookF className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaLinkedin className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AKTU BRAND. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
