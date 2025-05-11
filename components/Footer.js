import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer
      className="pb-4 px-3 md:px-20 text-primary bg-background"
       
    >
      <div className='bg-surface rounded-2xl py-4 px-10'>
<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-highlight)' }}>
            AKTU BRAND
          </h2>
          <p className="mt-4" style={{ color: 'var(--color-secondary)' }}>
            Your one-stop platform to access PDFs, Quantum books, and blogs to crack AKTU semester exams with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-link)' }}>
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/resources" style={{ color: 'var(--color-secondary)' }} className="hover:underline">Download PDFs</a></li>
            <li><a href="/blogs" style={{ color: 'var(--color-secondary)' }} className="hover:underline">Important Blogs</a></li>
            <li><a href="/faq" style={{ color: 'var(--color-secondary)' }} className="hover:underline">FAQs</a></li>
            <li><a href="/contact" style={{ color: 'var(--color-secondary)' }} className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-link)' }}>
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a href="#" style={{ color: 'var(--color-secondary)' }} className="hover:text-white"><FaFacebookF /></a>
            <a href="#" style={{ color: 'var(--color-secondary)' }} className="hover:text-white"><FaInstagram /></a>
            <a href="#" style={{ color: 'var(--color-secondary)' }} className="hover:text-white"><FaTwitter /></a>
            <a href="#" style={{ color: 'var(--color-secondary)' }} className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm" style={{ color: 'var(--color-secondary)' }}>
        &copy; {new Date().getFullYear()} AKTU BRAND. All rights reserved.
      </div>
      </div>
      
    </footer>
  );
} 

export default Footer;
