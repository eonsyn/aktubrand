import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
   <footer className="pb-4 px-3 md:px-6 bg-[var(--background)] text-[var(--text-primary)]">
  <div className="bg-[var(--card-background)] rounded-2xl py-6 px-8 shadow-md">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* About Section */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--accent)]">
          AKTU BRAND
        </h2>
        <p className="mt-4 text-[var(--text-secondary)]">
          Your one-stop platform to access PDFs, Quantum books, and blogs to crack AKTU semester exams with confidence.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
          Quick Links
        </h3>
        <ul className="space-y-2">
          <li><a href="/resources" className="text-[var(--text-secondary)] hover:text-[var(--accent)]">Download PDFs</a></li>
          <li><a href="/blogs" className="text-[var(--text-secondary)] hover:text-[var(--accent)]">Important Blogs</a></li>
          <li><a href="/faq" className="text-[var(--text-secondary)] hover:text-[var(--accent)]">FAQs</a></li>
          <li><a href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--accent)]">Contact Us</a></li>
        </ul>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-[var(--text-primary)]">
          Follow Us
        </h3>
        <div className="flex gap-4 text-xl text-[var(--text-secondary)]">
          <a href="#" className="hover:text-[var(--accent)]"><FaFacebookF /></a>
          <a href="#" className="hover:text-[var(--accent)]"><FaInstagram /></a>
          <a href="#" className="hover:text-[var(--accent)]"><FaTwitter /></a>
          <a href="#" className="hover:text-[var(--accent)]"><FaLinkedin /></a>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-10 text-center text-sm text-[var(--text-secondary)]">
      &copy; {new Date().getFullYear()} AKTU BRAND. All rights reserved.
    </div>
  </div>
</footer>
  );
}

export default Footer;
